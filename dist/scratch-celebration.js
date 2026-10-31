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
    strokes.sort((a,b)=>distance([(a.start[0]+a.end[0])/2,(a.start[1]+a.end[1])/2])-distance([(b.start[0]+b.end[0])/2,(b.start[1]+b.end[1])/2]));
    for(const stroke of strokes)if(distance(stroke.end)<distance(stroke.start))[stroke.start,stroke.end]=[stroke.end,stroke.start];
    // Begin inside the central land span, then work outward.
    if(strokes.length){const first=strokes.shift(),middle=first.start.map((v,i)=>(v+first.end[i])/2);strokes.unshift({start:middle,end:first.end,length:first.length/2},{start:middle,end:first.start,length:first.length/2});}
    return {strokes,step};
  }
  function makeStage(feature,color){
    const box=countryShape(feature),padding=Math.max(box.w,box.h)*.11;
    const svg=svgNode('svg',{viewBox:`${box.x-padding} ${box.y-padding} ${box.w+2*padding} ${box.h+2*padding}`,'aria-hidden':'true'});
    const defs=svgNode('defs');
    const gold=svgNode('linearGradient',{id:'scratch-gold',x1:0,y1:0,x2:1,y2:1});
    for(const [offset,fill] of [['0%','#ecd49d'],['45%','#c5a568'],['72%','#f4dfab'],['100%','#ad8950']])gold.append(svgNode('stop',{offset,'stop-color':fill}));
    const reveal=svgNode('mask',{id:'scratch-reveal',maskUnits:'userSpaceOnUse',x:box.x-padding,y:box.y-padding,width:box.w+2*padding,height:box.h+2*padding});
    const {strokes,step}=landStrokes(box),radius=Math.max(box.w,box.h)*.028;
    const fmt=p=>p.map(v=>v.toFixed(5)).join(',');
    for(const stroke of strokes){
      stroke.path=svgNode('path',{d:'M'+fmt(stroke.start)+'L'+fmt(stroke.end),fill:'none',stroke:'#fff','stroke-width':step*1.8,'stroke-linecap':'round'});
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
    coin.append(svgNode('circle',{r:radius,fill:'#d7b365',stroke:'#8e6d32','stroke-width':radius*.1}),svgNode('circle',{r:radius*.76,fill:'#f0d69a',stroke:'#b68b3d','stroke-width':radius*.045}));
    const coinMark=svgNode('text',{x:0,y:radius*.35,'text-anchor':'middle','font-size':radius*1.1,'font-family':'Georgia, serif',fill:'#9b7537'});coinMark.textContent='TE';coin.append(coinMark);svg.append(coin);
    return {svg,strokes,coin,colourPath,box,dust};
  }
  function makeFlag(code,name,reduced){
    const wrapper=document.createElement('div');wrapper.className='scratch-flag';
    const svg=svgNode('svg',{viewBox:'0 0 150 115',role:'img','aria-label':name+' flag waving in the wind'});
    const defs=svgNode('defs');
    const filter=svgNode('filter',{id:'scratch-flag-wind',x:'-15%',y:'-15%',width:'140%',height:'140%'});
    const noise=svgNode('feTurbulence',{type:'fractalNoise',baseFrequency:'.012 .025',numOctaves:2,seed:4,result:'wind'});
    if(!reduced)noise.append(svgNode('animate',{attributeName:'baseFrequency',values:'.012 .025;.018 .035;.012 .025',dur:'2.8s',repeatCount:'indefinite'}));
    filter.append(noise,svgNode('feDisplacementMap',{in:'SourceGraphic',in2:'wind',scale:reduced?0:7,xChannelSelector:'R',yChannelSelector:'G'}));defs.append(filter);svg.append(defs);
    svg.append(svgNode('path',{d:'M13 8V108',fill:'none',stroke:'#a68e5e','stroke-width':3,'stroke-linecap':'round'}),svgNode('circle',{cx:13,cy:7,r:4,fill:'#d1b574'}));
    const cloth=svgNode('g',{'class':'scratch-flag-cloth',filter:'url(#scratch-flag-wind)'});
    cloth.append(svgNode('image',{href:'flags/'+flags[code]+'.svg',x:16,y:13,width:116,height:87,preserveAspectRatio:'xMinYMin meet'}));svg.append(cloth);wrapper.append(svg);return wrapper;
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
      const source=audio.createBufferSource(),buffer=audio.createBuffer(1,audio.sampleRate*2,audio.sampleRate);
      const samples=buffer.getChannelData(0);let smooth=0;
      for(let i=0;i<samples.length;i++){smooth=.88*smooth+.12*(Math.random()*2-1);samples[i]=smooth;}
      source.buffer=buffer;const filter=audio.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1100;
      source.connect(filter);filter.connect(gain);gain.gain.setValueAtTime(0,now);
      gain.gain.linearRampToValueAtTime(.20,now+.15);gain.gain.exponentialRampToValueAtTime(.001,now+1.8);
      source.start();source.stop(now+2);nodes.push(source,filter);
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
  function cancel(){if(active){active.cancelled=true;active.sound?.stop();active.sound=null;active.effect?.stop();active.dialog.close();}}
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
    skip.addEventListener('click',cancel);dialog.addEventListener('cancel',()=>{run.cancelled=true;});dialog.addEventListener('close',()=>{run.cancelled=true;run.sound?.stop();run.sound=null;run.effect?.stop();});
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
        const liftTime=.004;
        const length=shape.strokes.reduce((sum,stroke)=>sum+stroke.weight+liftTime,0);let strokeIndex=0,strokeStart=0;
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
        if(reduced){shape.colourPath.removeAttribute('mask');caption.textContent=feature.properties.name+' · '+(facts[code]?.region||'');details.textContent=countryFacts(code);details.hidden=false;await wait(1500);}
        else{
          shape.coin.style.opacity='1';
          run.sound=scratchSound();
          await new Promise(resolve=>{
            const start=performance.now(),duration=9380;
            const frame=now=>{
              if(run.cancelled){resolve();return;}
              const progress=Math.min(1,(now-start)/duration);
              const distance=progress*length;
              while(strokeIndex<shape.strokes.length-1 && distance>strokeStart+shape.strokes[strokeIndex].weight+liftTime){
                shape.strokes[strokeIndex].path.setAttribute('stroke-dashoffset',0);
                strokeStart+=shape.strokes[strokeIndex].weight+liftTime;strokeIndex++;
              }
              const stroke=shape.strokes[strokeIndex];
              if(stroke){
                const local=Math.min(1,Math.max(0,(distance-strokeStart)/stroke.weight));
                const scratching=distance-strokeStart<=stroke.weight;
                const handLocal=(1-Math.cos(Math.PI*local))/2;
                stroke.path.setAttribute('stroke-dashoffset',stroke.length*(1-handLocal));
                const x=stroke.start[0]+(stroke.end[0]-stroke.start[0])*handLocal,y=stroke.start[1]+(stroke.end[1]-stroke.start[1])*handLocal;
                shape.coin.style.opacity=scratching?'1':'0';
                shape.coin.setAttribute('transform',`translate(${x},${y}) rotate(${-26+Math.sin(progress*45)*14})`);
                const openness=Math.min(1,stroke.length/Math.max(shape.box.w,shape.box.h)*2);
                const pressure=.15+.85*Math.sin(Math.PI*local)*openness;
                run.sound?.update(progress,scratching,pressure);
                if(scratching&&now-lastDust>32&&dustCount<720){
                  lastDust=now;
                  for(let fleck=0;fleck<3;fleck++){
                  dustCount++;
                  const size=Math.max(shape.box.w,shape.box.h)*(.0018+Math.random()*.0025);
                  const flake=svgNode('path',{d:`M${x-size},${y}l${size*1.4},${-size*.6} ${size},${size} ${-size*1.6},${size*.5}Z`,fill:['#e1c17e','#b8955d','#f0dba4'][dustCount%3],opacity:.85});
                  flake.dataset.drift=String(.6+Math.random());shape.dust.append(flake);
                  }
                }
              }
              if(progress<1)requestAnimationFrame(frame);else resolve();
            };requestAnimationFrame(frame);
          });
          run.sound?.stop();run.sound=null;
          shape.coin.style.opacity='0';shape.colourPath.removeAttribute('mask');
          if(run.cancelled)break;
          caption.textContent='One last puff…';run.effect=finishSound('blow');
          await new Promise(resolve=>{const start=performance.now();const frame=now=>{
            if(run.cancelled){resolve();return;}
            const p=Math.min(1,(now-start)/2000),ease=p*p;
            for(const flake of shape.dust.children){const drift=Number(flake.dataset.drift);flake.setAttribute('transform',`translate(${ease*shape.box.w*.7*drift},${-ease*shape.box.h*.3*drift})`);flake.setAttribute('opacity',String(.85*(1-p)));}
            if(p<1)requestAnimationFrame(frame);else resolve();
          };requestAnimationFrame(frame);});
          run.effect?.stop();run.effect=null;shape.dust.replaceChildren();
          if(run.cancelled)break;
          caption.textContent=feature.properties.name+' · '+(facts[code]?.region||'A new place uncovered');
          details.textContent=countryFacts(code);details.hidden=false;
          details.animate?.([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,fill:'both'});
          run.effect=finishSound('victory');onReveal(code);
          const end=performance.now()+10000;while(!run.cancelled&&performance.now()<end)await wait(50);
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
