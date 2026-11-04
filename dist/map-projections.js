'use strict';
(() => {
  const normalized=new WeakMap(),radians=Math.PI/180;
  // D3 uses clockwise spherical exterior rings; GeoJSON sources may use the reverse.
  function feature(input){
    if(normalized.has(input))return normalized.get(input);
    const polygon=p=>d3.geoArea({type:'Polygon',coordinates:p})>2*Math.PI?p.map(r=>[...r].reverse()):p;
    const geometry=input.geometry.type==='Polygon'?{type:'Polygon',coordinates:polygon(input.geometry.coordinates)}:{type:'MultiPolygon',coordinates:input.geometry.coordinates.map(polygon)};
    const result={...input,geometry};normalized.set(input,result);return result;
  }
  function overview(features){
    const land={type:'FeatureCollection',features:features.filter(f=>f.id!=='ATA').map(feature)};
    const projection=d3.geoNaturalEarth1().precision(.1).fitExtent([[12,12],[988,508]],land);
    const path=d3.geoPath(projection).digits(2);
    const [[left,top],[right,bottom]]=path.bounds(land),pad=3;
    const fullViewBox=[left-pad,top-pad,right-left+pad*2,bottom-top+pad*2].map(n=>n.toFixed(3)).join(' ');
    // Trim the side ocean bands in the initial frame; retain all paths for zoom/pan.
    const cutoff=Math.max(left-pad,projection([-161,20.5])[0]-pad);
    const frameWidth=right+pad-cutoff,west=cutoff+frameWidth*.07,east=right+pad-frameWidth*.05;
    const viewBox=[west,top-pad,east-west,bottom-top+pad*2].map(n=>n.toFixed(3)).join(' ');
    return {viewBox,fullViewBox,path:f=>path(feature(f))};
  }
  function country(input){
    const f=feature(input),all=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
    const area=p=>d3.geoArea({type:'Polygon',coordinates:p});
    const mainland=[...all].sort((a,b)=>area(b)-area(a))[0],center=d3.geoCentroid({type:'Polygon',coordinates:mainland});
    const longitude=lon=>center[0]+((lon-center[0]+540)%360)-180;
    const xs=mainland[0].map(p=>longitude(p[0])),ys=mainland[0].map(p=>p[1]);
    const west=Math.min(...xs)-5,east=Math.max(...xs)+5,south=Math.min(...ys)-5,north=Math.max(...ys)+5,mainArea=area(mainland);
    const polygons=all.filter(p=>{
      if(p===mainland)return true;
      const near=p[0].some(([x,y])=>longitude(x)>=west+4.5&&longitude(x)<=east-4.5&&y>=south+4.5&&y<=north-4.5);
      const substantial=area(p)>=mainArea*.05&&p[0].some(([x,y])=>longitude(x)>=west-20&&longitude(x)<=east+20&&y>=south-20&&y<=north+20);
      return substantial||((area(p)>=mainArea*.001||near)&&p[0].some(([x,y])=>longitude(x)>=west&&longitude(x)<=east&&y>=south&&y<=north));
    });
    // Stereographic is locally conformal: preserve angles/shapes around this country.
    const projection=d3.geoStereographic().rotate([-center[0],-center[1]]).translate([0,0]).scale(1/radians).clipAngle(110).precision(.03);
    const land=polygons.map(p=>p.map(ring=>{
      const points=[];
      for(let i=0;i<ring.length-1;i++){
        const a=ring[i],b=ring[i+1],steps=Math.max(1,Math.ceil(d3.geoDistance(a,b)/radians/.25)),interpolate=d3.geoInterpolate(a,b);
        for(let j=0;j<steps;j++)points.push(projection(interpolate(j/steps)));
      }
      points.push(projection(ring.at(-1)));return points;
    }));
    const points=land.flat(2),px=points.map(p=>p[0]),py=points.map(p=>p[1]),x=Math.min(...px),y=Math.min(...py);
    const d=land.map(p=>p.map(r=>r.map(([x,y],i)=>(i?'L':'M')+x.toFixed(4)+','+y.toFixed(4)).join(' ')+'Z').join(' ')).join(' ');
    return {d,land,projection,x,y,w:Math.max(.001,Math.max(...px)-x),h:Math.max(.001,Math.max(...py)-y)};
  }
  function context(input,frame){
    const projection=frame.projection.clipExtent([[frame.x,frame.y],[frame.x+frame.w,frame.y+frame.h]]);
    return d3.geoPath(projection).digits(4)(feature(input));
  }
  window.TRAVEL_MAP_PROJECTIONS={overview,country,context};
})();
