'use strict';
(() => {
  const ns='http://www.w3.org/2000/svg';
  let features=new Map(),colors={},flags={},facts={},active=null;
  function svgNode(tag,attrs={}){const node=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));return node;}
  function countryShape(feature){
    const allPolygons=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;
    const area=polygon=>Math.abs(polygon[0].reduce((sum,p,i,ring)=>{const q=ring[(i+1)%ring.length];return sum+p[0]*q[1]-q[0]*p[1];},0)/2);
    const mainland=[...allPolygons].sort((a,b)=>area(b)-area(a))[0];
    const xs=mainland[0].map(p=>p[0]),ys=mainland[0].map(p=>p[1]);
    const west=Math.min(...xs)-5,east=Math.max(...xs)+5,south=Math.min(...ys)-5,north=Math.max(...ys)+5;
    // Focus on the main geographic cluster; all territories still fill on the world map.
    const polygons=allPolygons.filter(p=>p===mainland || p[0].some(([x,y])=>x>=west&&x<=east&&y>=south&&y<=north));
    const biggest=[...polygons].sort((a,b)=>b[0].length-a[0].length)[0];
    const center=biggest[0].reduce((sum,p)=>sum+p[0],0)/biggest[0].length;
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    const land=polygons.map(polygon=>polygon.map(ring=>ring.map(([longitude,latitude])=>{let lon=longitude;while(lon-center>180)lon-=360;while(lon-center< -180)lon+=360;return [lon,-latitude];})));
    const d=polygons.map(polygon=>polygon.map(ring=>ring.map(([longitude,latitude],i)=>{
      let lon=longitude;while(lon-center>180)lon-=360;while(lon-center< -180)lon+=360;
      const x=lon,y=-latitude;minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
      return (i?'L':'M')+x.toFixed(4)+','+y.toFixed(4);
    }).join(' ')+'Z').join(' ')).join(' ');
    return {d,land,x:minX,y:minY,w:Math.max(.001,maxX-minX),h:Math.max(.001,maxY-minY)};
  }
  function landStrokes(box){
    // Intersect diagonal scanlines with actual land rings, including lake holes.
    const angle=-Math.PI/6,cos=Math.cos(angle),sin=Math.sin(angle);
    const rotate=([x,y])=>[x*cos+y*sin,-x*sin+y*cos];
    const project=([u,v])=>[u*cos-v*sin,u*sin+v*cos];
    const polygons=box.land.map(p=>p.map(r=>r.map(rotate)));
    const vertices=polygons.flat(2),top=Math.min(...vertices.map(p=>p[1])),bottom=Math.max(...vertices.map(p=>p[1]));
    const step=(bottom-top)/30,strokes=[];
    const levels=Array.from({length:30},(_,i)=>top+(i+.5)*step);
    // Give even tiny islands a pass when they fall between the regular rows.
    for(const polygon of polygons){const ys=polygon[0].map(p=>p[1]);levels.push((Math.min(...ys)+Math.max(...ys))/2);}
    levels.sort((a,b)=>a-b);
    for(let row=0;row<levels.length;row++){
      const v=levels[row],spans=[];
      for(const polygon of polygons){
        const cuts=[];
        for(const ring of polygon)for(let i=0;i<ring.length;i++){
          const a=ring[i],b=ring[(i+1)%ring.length];
          if((a[1]<=v&&b[1]>v)||(b[1]<=v&&a[1]>v))cuts.push(a[0]+(v-a[1])*(b[0]-a[0])/(b[1]-a[1]));
        }
        cuts.sort((a,b)=>a-b);
        for(let i=0;i+1<cuts.length;i+=2){
          const inset=Math.min(step*.12,(cuts[i+1]-cuts[i])*.12);
          if(cuts[i+1]-cuts[i]>step*.025)spans.push([cuts[i]+inset,cuts[i+1]-inset]);
        }
      }
      spans.sort((a,b)=>a[0]-b[0]);if(row%2)spans.reverse();
      for(const span of spans){const start=project([span[row%2?1:0],v]),end=project([span[row%2?0:1],v]);strokes.push({start,end,length:Math.hypot(end[0]-start[0],end[1]-start[1])});}
    }
    const cx=box.x+box.w/2,cy=box.y+box.h/2;
    const distance=p=>Math.hypot(p[0]-cx,p[1]-cy);
    const middle=s=>[(s.start[0]+s.end[0])/2,(s.start[1]+s.end[1])/2];
    strokes.sort((a,b)=>distance(middle(a))-distance(middle(b)));
    const first=strokes.shift(),ordered=[];
    if(first){const mid=middle(first);ordered.push({start:mid,end:first.end,length:first.length/2},{start:first.start,end:mid,length:first.length/2});}
    const threshold=Math.max(box.w,box.h)*.14;
    const groups=[strokes.filter(s=>s.length>=threshold&&middle(s)[1]<=cy),strokes.filter(s=>s.length>=threshold&&middle(s)[1]>cy),strokes.filter(s=>s.length<threshold)];
    let cursor=ordered.at(-1)?.end||[cx,cy];
    // Finish broad upper land, then broad lower land, before narrow coastal details.
    for(const group of groups)while(group.length){
      let best=0,reverse=false,cost=Infinity;
      for(let i=0;i<group.length;i++)for(const flip of [false,true]){const p=flip?group[i].end:group[i].start,d=Math.hypot(p[0]-cursor[0],p[1]-cursor[1]);if(d<cost){cost=d;best=i;reverse=flip;}}
      const stroke=group.splice(best,1)[0];if(reverse)[stroke.start,stroke.end]=[stroke.end,stroke.start];ordered.push(stroke);cursor=stroke.end;
    }
    strokes.splice(0,strokes.length,...ordered);
    return {strokes,step};
  }
  function makeStage(feature,color){
    const box=countryShape(feature),padding=Math.max(box.w,box.h)*.11;
    const svg=svgNode('svg',{viewBox:`${box.x-padding} ${box.y-padding} ${box.w+2*padding} ${box.h+2*padding}`,'aria-hidden':'true'});
    const defs=svgNode('defs');
    const gold=svgNode('linearGradient',{id:'scratch-gold',x1:0,y1:0,x2:1,y2:1});
    for(const [offset,fill] of [['0%','#ecd49d'],['45%','#c5a568'],['72%','#f4dfab'],['100%','#ad8950']])gold.append(svgNode('stop',{offset,'stop-color':fill}));
    // Tiny folded foil surfaces: alternating metallic faces, without glow or trails.
    for(const [id,dark,light] of [['gold','#9d793b','#f4dfa3'],['silver','#89918d','#eef0df'],['rose','#aa7767','#eac2a6']]){
      const metal=svgNode('linearGradient',{id:'foil-'+id,x1:0,y1:0,x2:1,y2:1});
      for(const [offset,fill] of [['0%',light],['42%',dark],['55%',light],['100%',dark]])metal.append(svgNode('stop',{offset,'stop-color':fill}));defs.append(metal);
    }
    const reveal=svgNode('mask',{id:'scratch-reveal',maskUnits:'userSpaceOnUse',x:box.x-padding,y:box.y-padding,width:box.w+2*padding,height:box.h+2*padding});
    const {strokes,step}=landStrokes(box),radius=Math.max(box.w,box.h)*.028;
    const fmt=p=>p.map(v=>v.toFixed(5)).join(',');
    for(const stroke of strokes){
      stroke.path=svgNode('path',{d:'M'+fmt(stroke.start)+'L'+fmt(stroke.end),fill:'none',stroke:'#fff','stroke-width':step*1.8,'stroke-linecap':'round'});
      stroke.path.setAttribute('visibility','hidden');
      stroke.path.setAttribute('stroke-dasharray',stroke.length);
      stroke.path.setAttribute('stroke-dashoffset',stroke.length);
      reveal.append(stroke.path);
    }
    defs.append(gold,reveal);svg.append(defs);
    const outline={d:box.d,'fill-rule':'evenodd','stroke-linejoin':'round'};
    svg.append(svgNode('path',{...outline,fill:'url(#scratch-gold)',stroke:'#ad8d53','stroke-width':Math.max(box.w,box.h)*.003}));
    const colourPath=svgNode('path',{...outline,fill:color,stroke:color,'stroke-width':Math.max(box.w,box.h)*.002,mask:'url(#scratch-reveal)'});
    svg.append(colourPath);
    const dust=svgNode('g',{'class':'scratch-dust'});svg.append(dust);
    const coin=svgNode('g',{'class':'scratch-coin'});
    // Freshly struck gold, with the ornament of an antique navigation medallion.
    const rim=svgNode('linearGradient',{id:'coin-rim',x1:'0%',y1:'0%',x2:'85%',y2:'100%'});
    for(const [offset,fill] of [['0%','#fff0b3'],['24%','#e4b955'],['49%','#a57324'],['70%','#f9dc83'],['100%','#bc8831']])rim.append(svgNode('stop',{offset,'stop-color':fill}));
    const face=svgNode('radialGradient',{id:'coin-face',cx:'34%',cy:'28%',r:'82%'});
    for(const [offset,fill] of [['0%','#fae8a8'],['58%','#dcb863'],['100%','#b18432']])face.append(svgNode('stop',{offset,'stop-color':fill}));defs.append(rim,face);
    const mint=svgNode('g',{transform:`scale(${radius/100})`});
    mint.append(svgNode('circle',{cy:4,r:100,fill:'#80541f'}),svgNode('circle',{r:100,fill:'url(#coin-rim)',stroke:'#805923','stroke-width':2}),svgNode('circle',{r:91,fill:'url(#coin-face)',stroke:'#ffecac','stroke-width':2}),svgNode('circle',{r:75,fill:'none',stroke:'#99702b','stroke-width':1.7}),svgNode('circle',{r:71,fill:'none',stroke:'#f9dfa0','stroke-width':1}));
    for(let i=0;i<44;i++){
      const angle=i*Math.PI*2/44;
      mint.append(svgNode('circle',{cx:Math.sin(angle)*83,cy:Math.cos(angle)*83,r:1.8,fill:'#f8df94',stroke:'#9a7028','stroke-width':.65}));
    }
    // Engraved compass rose: alternating raised and recessed facets.
    const rose=svgNode('g',{transform:'rotate(12)'});
    for(let i=0;i<8;i++){
      const ray=svgNode('g',{transform:`rotate(${i*45})`}),tip=i%2?-43:-59;
      ray.append(svgNode('path',{d:`M0 ${tip}L10 -11 0 -3Z`,fill:'#f8e3a2',stroke:'#9b742d','stroke-width':1}),svgNode('path',{d:`M0 ${tip}L-10 -11 0 -3Z`,fill:'#9a6c24',stroke:'#9b742d','stroke-width':1}));rose.append(ray);
    }
    mint.append(rose,svgNode('circle',{r:10,fill:'url(#coin-rim)',stroke:'#805923','stroke-width':1.3}),svgNode('circle',{r:4,fill:'#f8e7b5'}));
    // Small crescent engravings lend a celestial, mysterious character.
    for(const rotation of [22,112,202,292]){
      mint.append(svgNode('path',{d:'M-5 -61Q5 -54 10 -63Q6 -49 -5 -61Z',transform:`rotate(${rotation})`,fill:'#a0752d',stroke:'#f6d98f','stroke-width':.6}));
    }
    mint.append(svgNode('path',{d:'M-73 -54A91 91 0 0 1 30 -86',fill:'none',stroke:'#fff5cb','stroke-width':2.4,opacity:.8,'stroke-linecap':'round'}));
    coin.append(mint);svg.append(coin);
    return {svg,strokes,coin,colourPath,box,dust,radius,step};
  }
  function makeFlag(code,name,reduced){
    const wrapper=document.createElement('div');wrapper.className='scratch-flag';
    const svg=svgNode('svg',{viewBox:'0 0 150 115',role:'img','aria-label':name+' flag waving in the wind'});
    const defs=svgNode('defs');svg.append(defs);
    svg.append(svgNode('path',{d:'M13 8V108',fill:'none',stroke:'#a68e5e','stroke-width':3,'stroke-linecap':'round'}),svgNode('circle',{cx:13,cy:7,r:4,fill:'#d1b574'}));
    const cloth=svgNode('g',{'class':'scratch-flag-cloth'});
    const strips=28,left=16,top=13,width=116,height=77,frames=32;
    const wave=(x,phase)=>7*Math.pow(x/width,1.45)*Math.sin(phase-x/width*Math.PI*2.1);
    // Thin overlapping fabric panels share the same travelling wave at their edges.
    for(let i=0;i<strips;i++){
      const x=left+i*width/strips,w=width/strips,translations=[],skews=[],lights=[],shadows=[];
      for(let frame=0;frame<=frames;frame++){
        const phase=frame/frames*Math.PI*2;
        const y0=reduced?0:wave(x-left,phase),y1=reduced?0:wave(x+w-left,phase),slope=(y1-y0)/w;
        translations.push('0 '+(y0-slope*x).toFixed(4));skews.push((Math.atan(slope)*180/Math.PI).toFixed(4));
        const fold=Math.sin(phase-(i+.5)/strips*Math.PI*2.1),strength=Math.pow((i+.5)/strips,.7);
        lights.push((reduced?0:Math.max(0,fold)*.14*strength).toFixed(3));shadows.push((reduced?0:Math.max(0,-fold)*.12*strength).toFixed(3));
      }
      const clip=svgNode('clipPath',{id:'flag-panel-'+i});clip.append(svgNode('rect',{x,y:top,width:w+.22,height}));defs.append(clip);
      const lift=svgNode('g',{transform:'translate('+translations[0]+')'}),bend=svgNode('g',{transform:'skewY('+skews[0]+')'}),panel=svgNode('g',{'clip-path':'url(#flag-panel-'+i+')'});
      panel.append(svgNode('image',{href:'flags/'+flags[code]+'.svg',x:left,y:top,width,height,preserveAspectRatio:'none'}));
      const highlight=svgNode('rect',{x,y:top,width:w+.22,height,fill:'#fff7df',opacity:lights[0]}),shadow=svgNode('rect',{x,y:top,width:w+.22,height,fill:'#172522',opacity:shadows[0]});
      panel.append(highlight,shadow);bend.append(panel);lift.append(bend);cloth.append(lift);
      if(!reduced){
        const timing={dur:'3.4s',repeatCount:'indefinite',calcMode:'linear'};
        lift.append(svgNode('animateTransform',{...timing,attributeName:'transform',type:'translate',values:translations.join(';')}));
        bend.append(svgNode('animateTransform',{...timing,attributeName:'transform',type:'skewY',values:skews.join(';')}));
        highlight.append(svgNode('animate',{...timing,attributeName:'opacity',values:lights.join(';')}));shadow.append(svgNode('animate',{...timing,attributeName:'opacity',values:shadows.join(';')}));
      }
    }
    svg.append(cloth);wrapper.append(svg);return wrapper;
  }
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  let audio=null,muted=false;
  function prepareAudio(){
    try {const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return;audio ||= new Context();audio.resume().catch(()=>{});}catch{}
  }
  function scratchSound(){
    if(!audio || audio.state!=='running')return null;
    const source=audio.createBufferSource(),buffer=audio.createBuffer(1,audio.sampleRate*2,audio.sampleRate),samples=buffer.getChannelData(0);
    let smooth=0;for(let i=0;i<samples.length;i++){smooth=.7*smooth+.3*(Math.random()*2-1);samples[i]=smooth;}
    source.buffer=buffer;source.loop=true;
    const filter=audio.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1800;filter.Q.value=.65;
    const gain=audio.createGain();gain.gain.value=0;source.connect(filter);filter.connect(gain);gain.connect(audio.destination);source.start();
    return {update(progress,scratching=true,pressure=.5){
      filter.frequency.setTargetAtTime(2600-pressure*1700,audio.currentTime,.035);
      filter.Q.setTargetAtTime(.9-pressure*.5,audio.currentTime,.035);
      source.playbackRate.setTargetAtTime(.7+pressure*.8,audio.currentTime,.035);
      gain.gain.setTargetAtTime(muted||!scratching?0:.014+pressure*.052,audio.currentTime,.025);
    },stop(){gain.gain.setTargetAtTime(0,audio.currentTime,.02);setTimeout(()=>{try{source.stop();source.disconnect();filter.disconnect();gain.disconnect();}catch{}},100);}};
  }
  function finishSound(kind){
    if(!audio||audio.state!=='running'||muted)return null;
    const nodes=[],now=audio.currentTime;
    const gain=audio.createGain();gain.connect(audio.destination);nodes.push(gain);
    if(kind==='blow'){
      // A quiet, rounded breath gust with a little low-frequency wind body.
      const source=audio.createBufferSource(),duration=1.1;
      const buffer=audio.createBuffer(1,Math.ceil(audio.sampleRate*duration),audio.sampleRate);
      const samples=buffer.getChannelData(0);
      for(let i=0;i<samples.length;i++){
        const t=i/audio.sampleRate;
        const breath=(Math.random()*2-1)*(.88+.08*Math.sin(t*31)+.04*Math.sin(t*79));
        // A few very faint, dry irregularities suggest loose flakes lifting.
        const scatter=[.17,.28,.39].reduce((sum,at)=>sum+Math.exp(-Math.pow((t-at)/.018,2)),0);
        samples[i]=breath*(1+scatter*.12);
      }
      source.buffer=buffer;
      const highpass=audio.createBiquadFilter();highpass.type='highpass';highpass.frequency.value=280;highpass.Q.value=.5;
      const lowpass=audio.createBiquadFilter();lowpass.type='lowpass';lowpass.frequency.value=4800;lowpass.Q.value=.5;
      source.connect(highpass);highpass.connect(lowpass);lowpass.connect(gain);
      gain.gain.setValueAtTime(0,now);
      gain.gain.linearRampToValueAtTime(.060,now+.10);
      gain.gain.exponentialRampToValueAtTime(.030,now+.40);
      gain.gain.exponentialRampToValueAtTime(.0001,now+1.02);
      gain.gain.linearRampToValueAtTime(0,now+duration);
      source.start(now);source.stop(now+duration);nodes.push(source,highpass,lowpass);
    }else{
      gain.gain.value=.035;
      [659.25,830.61,987.77].forEach((frequency,i)=>{const oscillator=audio.createOscillator(),envelope=audio.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;envelope.gain.setValueAtTime(0,now);envelope.gain.setValueAtTime(.001,now+i*.12);envelope.gain.linearRampToValueAtTime(.65,now+i*.12+.035);envelope.gain.exponentialRampToValueAtTime(.001,now+i*.12+1.1);oscillator.connect(envelope);envelope.connect(gain);oscillator.start(now+i*.12);oscillator.stop(now+1.6);nodes.push(oscillator,envelope);});
    }
    let stopped=false;const stop=()=>{if(stopped)return;stopped=true;for(const node of nodes){try{node.stop?.();node.disconnect();}catch{}}};
    setTimeout(stop,2200);return {stop};
  }
  function countryFacts(code){
    const row=facts[code];if(!row)return '';
    const compact=n=>new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(n);
    return `Population ${compact(row.population)} · ${row.populationShare}% world · Rank ${row.populationRank}/234\nArea ${row.area===0?'<1':compact(row.area)} km\u00b2 · ${row.areaShare}% world · Rank ${row.areaRank}/234`;
  }
  function cancel(){if(active){active.cancelled=true;active.finish?.();active.sound?.stop();active.sound=null;active.effect?.stop();active.dialog.close();}}
  async function celebrate(codes,onReveal=()=>{}){
    cancel();
    const mapped=codes.filter(code=>features.has(code));
    if(!mapped.length){codes.forEach(onReveal);return;}
    const dialog=document.createElement('dialog');dialog.className='scratch-celebration';
    const content=document.createElement('div');content.className='scratch-celebration-inner';
    const eyebrow=document.createElement('p');eyebrow.className='scratch-eyebrow';eyebrow.textContent='A NEW CHAPTER, UNCOVERED';
    const title=document.createElement('h2');title.id='scratch-celebration-title';dialog.setAttribute('aria-labelledby',title.id);
    const stage=document.createElement('div');stage.className='scratch-country-stage';
    const caption=document.createElement('p');caption.className='scratch-caption';
    const details=document.createElement('p');details.className='scratch-result-facts';details.hidden=true;details.setAttribute('aria-live','polite');
    const skip=document.createElement('button');skip.type='button';skip.className='scratch-skip';skip.textContent='Skip animation';
    const soundButton=document.createElement('button');soundButton.type='button';soundButton.className='scratch-sound';
    const soundLabel=()=>{soundButton.textContent=muted?'Sound off':'Sound on';soundButton.setAttribute('aria-pressed',String(!muted));};soundLabel();
    soundButton.addEventListener('click',()=>{muted=!muted;if(muted){run.effect?.stop();run.effect=null;}prepareAudio();soundLabel();});
    content.append(eyebrow,title,stage,caption,details,skip,soundButton);dialog.append(content);document.body.append(dialog);
    const run={dialog,cancelled:false};active=run;
    skip.addEventListener('click',cancel);dialog.addEventListener('cancel',()=>{run.cancelled=true;});dialog.addEventListener('close',()=>{run.cancelled=true;run.finish?.();run.sound?.stop();run.sound=null;run.effect?.stop();});
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const rect=dialog.getBoundingClientRect();
      if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)cancel();
    });
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    try{
      dialog.showModal();skip.focus({preventScroll:true});
      const sequence=mapped.slice(0,3);
      for(let index=0;index<sequence.length&&!run.cancelled;index++){
        const code=sequence[index],feature=features.get(code);
        title.textContent=feature.properties.name;details.hidden=true;details.textContent='';
        caption.textContent=codes.length===1?'A memory worth keeping.':`${index+1} of ${codes.length} newly travelled places`;
        const shape=makeStage(feature,colors[code]||'#82afd0');stage.replaceChildren(shape.svg);
        if(flags[code])stage.append(makeFlag(code,feature.properties.name,reduced));

        for(const stroke of shape.strokes)stroke.weight=Math.sqrt(stroke.length/Math.max(shape.box.w,shape.box.h))*.55+.006;
        const scale=Math.max(shape.box.w,shape.box.h);
        shape.strokes.forEach((stroke,i)=>{const next=shape.strokes[i+1];stroke.lift=next?.start||stroke.end;stroke.liftWeight=next?.start ? .018+Math.hypot(stroke.lift[0]-stroke.end[0],stroke.lift[1]-stroke.end[1])/scale*.28 : 0;});
        const length=shape.strokes.reduce((sum,stroke)=>sum+stroke.weight+stroke.liftWeight,0);let strokeIndex=0,strokeStart=0;
        let lastDust=0,dustCount=0;
        shape.coin.style.opacity='0';
        const mapPath=document.querySelector(`#visited-world-map path[data-country="${code}"]`);
        const source=mapPath?.getBoundingClientRect(),target=stage.getBoundingClientRect();
        if(!reduced){
          const scale=source?Math.max(.035,Math.min(.22,source.width/target.width)):.12;
          const dx=source?Math.max(-innerWidth,Math.min(innerWidth,source.left+source.width/2-target.left-target.width/2)):0;
          const dy=source?Math.max(-innerHeight*.6,Math.min(innerHeight*.6,source.top+source.height/2-target.top-target.height/2)):90;
          await shape.svg.animate([{transform:`translate(${dx}px,${dy}px) scale(${scale})`,opacity:.25},{transform:'translate(0,0) scale(1)',opacity:1}],{duration:620,easing:'cubic-bezier(.2,.75,.2,1)',fill:'both'}).finished;
        }
        if(run.cancelled)break;
        if(reduced){shape.colourPath.removeAttribute('mask');caption.textContent=feature.properties.name+' · '+(facts[code]?.region||'');details.textContent=countryFacts(code);details.hidden=false;onReveal(code);await new Promise(resolve=>{run.finish=resolve;skip.textContent='Close';});run.finish=null;}
        else{
          shape.coin.style.opacity='1';
          run.sound=scratchSound();
          await new Promise(resolve=>{
            const start=performance.now(),duration=11380;
            const frame=now=>{
              if(run.cancelled){resolve();return;}
              const progress=Math.min(1,(now-start)/duration);
              const distance=progress*length;
              while(strokeIndex<shape.strokes.length-1 && distance>strokeStart+shape.strokes[strokeIndex].weight+shape.strokes[strokeIndex].liftWeight){
                shape.strokes[strokeIndex].path.setAttribute('visibility','visible');shape.strokes[strokeIndex].path.setAttribute('stroke-dashoffset',0);
                strokeStart+=shape.strokes[strokeIndex].weight+shape.strokes[strokeIndex].liftWeight;strokeIndex++;
              }
              const stroke=shape.strokes[strokeIndex];
              if(stroke){
                const local=Math.min(1,Math.max(0,(distance-strokeStart)/stroke.weight));
                const scratching=distance-strokeStart<=stroke.weight;
                const handLocal=(1-Math.cos(Math.PI*local))/2;
                if(local>0)stroke.path.setAttribute('visibility','visible');
                stroke.path.setAttribute('stroke-dashoffset',stroke.length*(1-handLocal));
                let x=stroke.start[0]+(stroke.end[0]-stroke.start[0])*handLocal,y=stroke.start[1]+(stroke.end[1]-stroke.start[1])*handLocal;
                if(!scratching){const t=Math.max(0,Math.min(1,(distance-strokeStart-stroke.weight)/Math.max(.00001,stroke.liftWeight))),ease=t*t*(3-2*t);x=stroke.end[0]+(stroke.lift[0]-stroke.end[0])*ease;y=stroke.end[1]+(stroke.lift[1]-stroke.end[1])*ease-Math.sin(t*Math.PI)*scale*.025;}
                shape.coin.style.opacity=scratching?'1':'.55';
                shape.coin.setAttribute('transform',`translate(${x},${y}) rotate(${-26+Math.sin(progress*45)*14})`);
                const openness=Math.min(1,stroke.length/Math.max(shape.box.w,shape.box.h)*2);
                const pressure=.15+.85*Math.sin(Math.PI*local)*openness;
                run.sound?.update(progress,scratching,pressure);
                if(scratching&&now-lastDust>24&&dustCount<7200){
                  lastDust=now;
                  const dx=(stroke.end[0]-stroke.start[0])/stroke.length,dy=(stroke.end[1]-stroke.start[1])/stroke.length;
                  for(let fleck=0;fleck<24;fleck++){
                    dustCount++;
                    // Coin pushes most flakes into ridges on both sides; a few stay in the groove.
                    const side=fleck%2?1:-1,offset=fleck%6===5?(Math.random()-.5)*shape.radius*.6:side*shape.radius*(.65+Math.random()*1.35);
                    const along=(Math.random()-.5)*shape.radius*1.6;
                    const px=x-dy*offset+dx*along,py=y+dx*offset+dy*along;
                    const powder=dustCount%4===0;
                    const size=scale*(powder?.00065+Math.random()*.0012:.0016+Math.random()*.0024);
                    const angle=Math.random()*360;
                    const flake=svgNode('g',{'class':'foil-flake',transform:`translate(${px},${py}) rotate(${angle})`});
                    const metal=dustCount%11===0?'rose':dustCount%5===0?'silver':'gold';
                    flake.append(svgNode('path',{d:`M${-size},${-size*.25}L${-size*.2},${-size*.6} ${size*.9},${-size*.3} ${size*.6},${size*.45} ${-size*.55},${size*.3}Z`,fill:'url(#foil-'+metal+')',opacity:powder?.72:.94}));
                    if(!powder)flake.append(svgNode('path',{d:`M${-size*.6},${-size*.2}L${size*.5},${size*.08}`,fill:'none',stroke:'#fff3c9','stroke-width':size*.12,opacity:.5}));
                    Object.assign(flake.dataset,{x:String(px),y:String(py),angle:String(angle),drift:String(Math.random()*2-1),cling:String(.04+Math.random()*.17),spin:String((Math.random()*2-1)*200)});
                    shape.dust.append(flake);
                  }
                }
              }
              if(progress<1)requestAnimationFrame(frame);else resolve();
            };requestAnimationFrame(frame);
          });
          run.sound?.stop();run.sound=null;
          shape.coin.style.opacity='0';shape.colourPath.removeAttribute('mask');
          if(run.cancelled)break;
          caption.textContent='';run.effect=finishSound('blow');
          await new Promise(resolve=>{const start=performance.now();const frame=now=>{
            if(run.cancelled){resolve();return;}
            const p=Math.min(1,(now-start)/2000);
            for(const flake of shape.dust.children){
              const x=Number(flake.dataset.x),y=Number(flake.dataset.y),drift=Number(flake.dataset.drift);
              // Air reaches the near/bottom edge first; static cling briefly delays lift-off.
              const fromBottom=Math.max(0,Math.min(1,(shape.box.y+shape.box.h-y)/shape.box.h));
              const delay=fromBottom*.22+Number(flake.dataset.cling);
              const t=Math.max(0,Math.min(1,(p-delay)/(1-delay))),lift=t*t*(2-t);
              const up=(shape.box.h+Math.max(shape.box.w,shape.box.h)*1.3)*lift;
              const flutter=Math.sin(t*13+drift*4)*shape.box.w*.012*Math.sin(Math.PI*t);
              const sideways=drift*shape.box.w*.055*t+flutter;
              const angle=Number(flake.dataset.angle)+Number(flake.dataset.spin)*t;
              flake.setAttribute('transform',`translate(${x+sideways},${y-up}) rotate(${angle}) scale(1,${1-.65*Math.abs(Math.sin(t*11))})`);
              // Stay opaque until airborne near the upper edge; no dissolving comet tail.
              flake.setAttribute('opacity',String(t<.78?1:Math.max(0,(1-t)/.22)));
            }
            if(p<1)requestAnimationFrame(frame);else resolve();
          };requestAnimationFrame(frame);});
          run.effect?.stop();run.effect=null;shape.dust.replaceChildren();
          if(run.cancelled)break;
          caption.textContent=feature.properties.name+' · '+(facts[code]?.region||'A new place uncovered');
          details.textContent=countryFacts(code);details.hidden=false;
          details.animate?.([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,fill:'both'});
          run.effect=finishSound('victory');onReveal(code);
          await new Promise(resolve=>{run.finish=resolve;skip.textContent='Close';});run.finish=null;
          run.effect?.stop();run.effect=null;
        }
        onReveal(code);
      }
      if(!run.cancelled&&codes.length>3){caption.textContent=`All ${codes.length} places are now part of your map.`;await wait(reduced?300:650);}
    }finally{
      run.sound?.stop();run.sound=null;run.effect?.stop();
      codes.forEach(onReveal);
      if(dialog.open)dialog.close();dialog.remove();if(active===run)active=null;
    }
  }
  window.TRAVEL_SCRATCH={init(outlines,palette,catalogue=[]){const populationTotal=catalogue.reduce((sum,c)=>sum+(c.population||0),0),areaTotal=catalogue.reduce((sum,c)=>sum+(c.area||0),0);
    facts=Object.fromEntries(catalogue.map(c=>[c.code,{...c,populationShare:(c.population/populationTotal*100).toFixed(2),areaShare:(c.area/areaTotal*100).toFixed(2)}]));flags=Object.fromEntries(catalogue.map(country=>[country.code,country.iso2.toLowerCase()]));features=new Map(outlines.features.map(feature=>[feature.id,feature]));colors=palette;},celebrate,cancel,prepareAudio};
})();
