'use strict';
(() => {
  function attach(svg,container,card){
    const [x,y,w,h]=svg.getAttribute('viewBox').trim().split(/\s+/).map(Number);
    const base={x,y,w,h},maxZoom=64;
    const [ex,ey,ew,eh]=(svg.dataset.mapExtent||svg.getAttribute('viewBox')).trim().split(/\s+/).map(Number),extent={x:ex,y:ey,w:ew,h:eh};
    let box={...base},drag=null,suppressClick=false;
    const buttons={in:card.querySelector('[data-map-zoom="in"]'),out:card.querySelector('[data-map-zoom="out"]'),reset:card.querySelector('[data-map-zoom="reset"]')};
    const status=card.querySelector('#map-zoom-level');
    const level=()=>base.w/box.w;
    function render(){
      box.x=Math.max(extent.x,Math.min(extent.x+extent.w-box.w,box.x));box.y=Math.max(extent.y,Math.min(extent.y+extent.h-box.h,box.y));
      svg.setAttribute('viewBox',`${box.x} ${box.y} ${box.w} ${box.h}`);
      const zoom=level();status.textContent=Math.round(zoom*100)+'%';
      buttons.in.disabled=zoom>=maxZoom-.001;buttons.out.disabled=zoom<=1.001;buttons.reset.disabled=zoom<=1.001&&Math.abs(box.x-base.x)<.01&&Math.abs(box.y-base.y)<.01;
      container.classList.toggle('map-is-zoomed',zoom>1.001);container.classList.add('map-is-pannable');container.style.touchAction='none';
    }
    function point(event,matrix=svg.getScreenCTM()?.inverse()){
      if(!matrix)return {x:box.x+box.w/2,y:box.y+box.h/2};
      const p=svg.createSVGPoint();p.x=event.clientX;p.y=event.clientY;return p.matrixTransform(matrix);
    }
    function zoom(factor,anchor={x:box.x+box.w/2,y:box.y+box.h/2}){
      const next=Math.max(1,Math.min(maxZoom,level()*factor));
      const width=base.w/next,height=base.h/next;
      const rx=(anchor.x-box.x)/box.w,ry=(anchor.y-box.y)/box.h;
      box={x:anchor.x-rx*width,y:anchor.y-ry*height,w:width,h:height};render();
    }
    function reset(){box={...base};render();}
    buttons.in.addEventListener('click',()=>zoom(1.7));buttons.out.addEventListener('click',()=>zoom(1/1.7));buttons.reset.addEventListener('click',reset);
    container.addEventListener('wheel',event=>{
      event.preventDefault();zoom(Math.exp(-Math.max(-120,Math.min(120,event.deltaY))*.005),point(event));
    },{passive:false});
    svg.addEventListener('pointerdown',event=>{
      suppressClick=false;svg.dataset.suppressSelection='false';
      if(event.button!==0)return;
      const matrix=svg.getScreenCTM()?.inverse();
      drag={id:event.pointerId,x:event.clientX,y:event.clientY,start:point(event,matrix),box:{...box},matrix,moved:false};

    });
    svg.addEventListener('pointermove',event=>{
      if(!drag||event.pointerId!==drag.id)return;
      if(!drag.moved&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<5)return;
      if(!drag.moved)svg.setPointerCapture(event.pointerId);
      drag.moved=true;container.classList.add('map-is-dragging');
      const p=point(event,drag.matrix);box={...drag.box,x:drag.box.x+drag.start.x-p.x,y:drag.box.y+drag.start.y-p.y};render();
    });
    const end=event=>{if(!drag||event.pointerId!==drag.id)return;suppressClick=drag.moved;svg.dataset.suppressSelection=String(drag.moved);drag=null;container.classList.remove('map-is-dragging');if(svg.hasPointerCapture(event.pointerId))svg.releasePointerCapture(event.pointerId);};
    svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
    container.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}},true);
    container.addEventListener('keydown',event=>{
      if(event.key==='+'||event.key==='='){event.preventDefault();zoom(1.7);}
      else if(event.key==='-'){event.preventDefault();zoom(1/1.7);}
      else if(event.key==='0'){event.preventDefault();reset();}
      else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
        event.preventDefault();const step=box.w*.12;
        if(event.key==='ArrowLeft')box.x-=step;if(event.key==='ArrowRight')box.x+=step;if(event.key==='ArrowUp')box.y-=step;if(event.key==='ArrowDown')box.y+=step;render();
      }
    });
    render();return {reset};
  }
  window.TRAVEL_MAP_ZOOM={attach};
})();
