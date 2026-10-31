'use strict';
(() => {
  const ns='http://www.w3.org/2000/svg';
  let features=new Map(),colors={},active=null;
  function svgNode(tag,attrs={}){const node=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));return node;}
  function countryShape(feature){
    const polygons=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;
    const biggest=[...polygons].sort((a,b)=>b[0].length-a[0].length)[0];
    const center=biggest[0].reduce((sum,p)=>sum+p[0],0)/biggest[0].length;
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    const d=polygons.map(polygon=>polygon.map(ring=>ring.map(([longitude,latitude],i)=>{
      let lon=longitude;while(lon-center>180)lon-=360;while(lon-center< -180)lon+=360;
      const x=lon,y=-latitude;minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
      return (i?'L':'M')+x.toFixed(4)+','+y.toFixed(4);
    }).join(' ')+'Z').join(' ')).join(' ');
    return {d,x:minX,y:minY,w:Math.max(.001,maxX-minX),h:Math.max(.001,maxY-minY)};
  }
  function makeStage(feature,color){
    const box=countryShape(feature),padding=Math.max(box.w,box.h)*.11;
    const svg=svgNode('svg',{viewBox:`${box.x-padding} ${box.y-padding} ${box.w+2*padding} ${box.h+2*padding}`,'aria-hidden':'true'});
    const defs=svgNode('defs');
    const gold=svgNode('linearGradient',{id:'scratch-gold',x1:0,y1:0,x2:1,y2:1});
    for(const [offset,fill] of [['0%','#ecd49d'],['45%','#c5a568'],['72%','#f4dfab'],['100%','#ad8950']])gold.append(svgNode('stop',{offset,'stop-color':fill}));
    const reveal=svgNode('mask',{id:'scratch-reveal',maskUnits:'userSpaceOnUse',x:box.x-padding,y:box.y-padding,width:box.w+2*padding,height:box.h+2*padding});
    const lines=15,step=box.h/(lines-1),radius=Math.max(box.w,box.h)*.045;
    const points=[];
    for(let i=0;i<lines;i++){
      const y=box.y+i*step;
      points.push([i%2?box.x+box.w+radius:box.x-radius,y],[i%2?box.x-radius:box.x+box.w+radius,y]);
    }
    const scratchD=points.map(([x,y],i)=>(i?'L':'M')+x+','+y).join(' ');
    const trail=svgNode('path',{d:scratchD,fill:'none',stroke:'#fff','stroke-width':Math.max(step*1.6,radius*2),'stroke-linecap':'round','stroke-linejoin':'round'});
    reveal.append(trail);defs.append(gold,reveal);svg.append(defs);
    const outline={d:box.d,'fill-rule':'evenodd','stroke-linejoin':'round'};
    svg.append(svgNode('path',{...outline,fill:'url(#scratch-gold)',stroke:'#ad8d53','stroke-width':Math.max(box.w,box.h)*.003}));
    const colourPath=svgNode('path',{...outline,fill:color,stroke:color,'stroke-width':Math.max(box.w,box.h)*.002,mask:'url(#scratch-reveal)'});
    svg.append(colourPath);
    const coin=svgNode('g',{'class':'scratch-coin'});
    coin.append(svgNode('circle',{r:radius,fill:'#d7b365',stroke:'#8e6d32','stroke-width':radius*.1}),svgNode('circle',{r:radius*.76,fill:'#f0d69a',stroke:'#b68b3d','stroke-width':radius*.045}));
    const coinMark=svgNode('text',{x:0,y:radius*.35,'text-anchor':'middle','font-size':radius*1.1,'font-family':'Georgia, serif',fill:'#9b7537'});coinMark.textContent='TE';coin.append(coinMark);svg.append(coin);
    return {svg,trail,coin,colourPath,points,box};
  }
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  function cancel(){if(active){active.cancelled=true;active.dialog.close();}}
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
    const skip=document.createElement('button');skip.type='button';skip.className='scratch-skip';skip.textContent='Skip animation';
    content.append(eyebrow,title,stage,caption,skip);dialog.append(content);document.body.append(dialog);
    const run={dialog,cancelled:false};active=run;
    skip.addEventListener('click',cancel);dialog.addEventListener('cancel',()=>{run.cancelled=true;});dialog.addEventListener('close',()=>{run.cancelled=true;});
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    try{
      dialog.showModal();skip.focus({preventScroll:true});
      const sequence=mapped.slice(0,3);
      for(let index=0;index<sequence.length&&!run.cancelled;index++){
        const code=sequence[index],feature=features.get(code);
        title.textContent=feature.properties.name;
        caption.textContent=codes.length===1?'A memory worth keeping.':`${index+1} of ${codes.length} newly travelled places`;
        const shape=makeStage(feature,colors[code]||'#82afd0');stage.replaceChildren(shape.svg);
        const length=shape.trail.getTotalLength();shape.trail.setAttribute('stroke-dasharray',length);shape.trail.setAttribute('stroke-dashoffset',length);shape.coin.style.opacity='0';
        const mapPath=document.querySelector(`#visited-world-map path[data-country="${code}"]`);
        const source=mapPath?.getBoundingClientRect(),target=stage.getBoundingClientRect();
        if(!reduced){
          const scale=source?Math.max(.035,Math.min(.22,source.width/target.width)):.12;
          const dx=source?Math.max(-innerWidth,Math.min(innerWidth,source.left+source.width/2-target.left-target.width/2)):0;
          const dy=source?Math.max(-innerHeight*.6,Math.min(innerHeight*.6,source.top+source.height/2-target.top-target.height/2)):90;
          await shape.svg.animate([{transform:`translate(${dx}px,${dy}px) scale(${scale})`,opacity:.25},{transform:'translate(0,0) scale(1)',opacity:1}],{duration:620,easing:'cubic-bezier(.2,.75,.2,1)',fill:'both'}).finished;
        }
        if(run.cancelled)break;
        if(reduced){shape.trail.setAttribute('stroke-dashoffset',0);await wait(450);}
        else{
          shape.coin.style.opacity='1';
          await new Promise(resolve=>{
            const start=performance.now(),duration=1650;
            const frame=now=>{
              if(run.cancelled){resolve();return;}
              const progress=Math.min(1,(now-start)/duration),distance=progress*length;
              shape.trail.setAttribute('stroke-dashoffset',length-distance);
              const point=shape.trail.getPointAtLength(distance);
              shape.coin.setAttribute('transform',`translate(${point.x},${point.y}) rotate(${Math.sin(progress*35)*12})`);
              if(progress<1)requestAnimationFrame(frame);else resolve();
            };requestAnimationFrame(frame);
          });
          shape.coin.style.opacity='0';await wait(200);
        }
        onReveal(code);
      }
      if(!run.cancelled&&codes.length>3){caption.textContent=`All ${codes.length} places are now part of your map.`;await wait(reduced?300:650);}
    }finally{
      codes.forEach(onReveal);
      if(dialog.open)dialog.close();dialog.remove();if(active===run)active=null;
    }
  }
  window.TRAVEL_SCRATCH={init(outlines,palette){features=new Map(outlines.features.map(feature=>[feature.id,feature]));colors=palette;},celebrate,cancel};
})();
