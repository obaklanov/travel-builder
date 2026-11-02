import json, math, sys
from pathlib import Path
from shapely.geometry import shape, mapping
from shapely.ops import unary_union
from shapely.strtree import STRtree
root=Path(__file__).resolve().parents[1]
work=Path(__file__).parent
catalogue=json.loads((root/'dist/country-catalog.json').read_text(encoding='utf-8'))
codes={c['code'] for c in catalogue}
source=Path(sys.argv[1]) if len(sys.argv)>1 else work/'natural-earth-map-units.geojson'
raw=json.loads(source.read_text(encoding='utf-8'))
groups={}
for feature in raw['features']:
 p=feature['properties']
 code=next((p.get(k) for k in ['ISO_A3','ISO_A3_EH','GU_A3','ADM0_A3'] if p.get(k) in codes),None)
 if code:groups.setdefault(code,[]).append(shape(feature['geometry']))
geometries={code:unary_union(parts) for code,parts in groups.items()}
# Preserve internationally recognized Ukrainian borders, including Crimea and Donbas.
recognized=json.loads((root/'data/ukraine-recognized-borders.geojson').read_text(encoding='utf-8'))
for feature in recognized['features']:
 geometries[feature['id']]=shape(feature['geometry'])
somalia=json.loads((root/'data/somalia-recognized-borders.geojson').read_text(encoding='utf-8'))
for feature in somalia['features']:
 geometries[feature['id']]=shape(feature['geometry'])
keys=sorted(geometries);geoms=[geometries[c] for c in keys];tree=STRtree(geoms)
neighbors={code:set() for code in keys}
for i,geom in enumerate(geoms):
 for j in tree.query(geom.buffer(.00001)):
  j=int(j)
  if j>i and geom.distance(geoms[j])<.00001:
   neighbors[keys[i]].add(keys[j]);neighbors[keys[j]].add(keys[i])
palette=['#82afd0','#e3bc58','#8bb686','#cd8b82','#aa98c7','#68b9b4','#dba36a','#bd9cb8','#94a7c0','#b7b78a','#d4a6c8','#a6c4a9']
anchors={'FRA':'#254b8f','ESP':'#e3bc58','ARG':'#65aee0','BRA':'#6aa76b','CHL':'#cf816b','URY':'#aa98c7','BOL':'#d4b75e','PRY':'#dba36a','ITA':'#75a479','DEU':'#c89258','PRT':'#79a177','GBR':'#d47984','CAN':'#c77c78','USA':'#8badc5','MEX':'#8bb686','JPN':'#d88e98','THA':'#a29bc8','NZL':'#80ae92','AUS':'#e3bc58'}
colors={code:color for code,color in anchors.items() if code in codes}
while len(colors)<len(codes):
 uncolored=codes-colors.keys()
 code=max(uncolored,key=lambda c:(len({colors[n] for n in neighbors.get(c,[]) if n in colors}),len(neighbors.get(c,[])),c))
 used={colors[n] for n in neighbors.get(code,[]) if n in colors}
 # Spread colours deterministically; geographic neighbours never share a fill.
 offset=sum(ord(ch) for ch in code)%len(palette)
 colors[code]=next(palette[(offset+i)%len(palette)] for i in range(len(palette)) if palette[(offset+i)%len(palette)] not in used)
conflicts=[(a,b) for a in neighbors for b in neighbors[a] if a<b and colors[a]==colors[b]]
assert not conflicts,conflicts
def rounded(obj):
 if isinstance(obj,(list,tuple)):return [rounded(v) for v in obj]
 if isinstance(obj,float):return round(obj,4)
 return obj
features=[]
for code in keys:
 # Keep all islands and territorial parts; simplify only below display resolution.
 geometry=geometries[code].simplify(.003,preserve_topology=True)
 if code=='RUS':geometry=geometry.difference(geometries['UKR'].simplify(.003,preserve_topology=True))
 g=mapping(geometry)
 features.append({'type':'Feature','id':code,'properties':{'name':next(c['name'] for c in catalogue if c['code']==code)},'geometry':{'type':g['type'],'coordinates':rounded(g['coordinates'])}})
output={'type':'FeatureCollection','source':'Natural Earth 1:10m admin-0 map units, public domain','features':features}
(root/'dist/profile-country-outlines.json').write_text(json.dumps(output,separators=(',',':')),encoding='utf-8')
(root/'dist/country-colors.json').write_text(json.dumps({'colors':dict(sorted(colors.items())),'neighbors':{c:sorted(v) for c,v in sorted(neighbors.items())}},indent=2)+'\n',encoding='utf-8')
print(json.dumps({'mapped':len(features),'catalogue':len(codes),'missing':sorted(codes-geometries.keys()),'adjacencyPairs':sum(len(v) for v in neighbors.values())//2,'conflicts':len(conflicts),'geometryBytes':(root/'dist/profile-country-outlines.json').stat().st_size}))

