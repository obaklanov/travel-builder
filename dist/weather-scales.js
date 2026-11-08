'use strict';
(() => {
  const form=document.querySelector('#destination-search');if(!form)return;
  const sun='<circle cx="52" cy="32" r="13" fill="#f6c65b"/><path d="M52 10v-5m0 54v-5M30 32h-5m54 0h-5M36 16l-4-4m36 36l4 4M68 16l4-4M36 48l-4 4" stroke="#db9c35" stroke-width="2.5" stroke-linecap="round"/>';
  const cloud='<path d="M28 55a12 12 0 0 1-1-24 17 17 0 0 1 32-5 14 14 0 1 1 6 29Z" fill="#dce8f4" stroke="#819db8" stroke-width="2"/>';
  function picture(id,index){
    let art='';
    if(id==='humidity'){
      const drops=[0,1,2,4,6][index];art='<circle cx="50" cy="40" r="33" fill="'+['#f4dfb5','#efe5cb','#d9e9de','#d0e8ee','#bedeea'][index]+'"/><path d="M18 68h64" stroke="#88a29a" stroke-width="2"/>';
      if(index<2)art+='<circle cx="50" cy="31" r="12" fill="#ecc56b"/><path d="m32 63 9-8 10 8 9-8 11 8" fill="none" stroke="#bc9a68" stroke-width="2"/>';
      for(let i=0;i<drops;i++){const x=28+(i%3)*22,y=18+Math.floor(i/3)*24;art+='<path d="M'+x+' '+y+'q-10 13 0 16 10-3 0-16Z" fill="#79b5cb" stroke="#5a96af"/>';}
      return '<svg viewBox="0 0 100 84" aria-hidden="true">'+art+'</svg>';
    }
    if(id==='advisory'){
      const colour=['#79a990','#a5b27f','#d1b16a','#d79463','#bc786b'][index];
      const face=index<2?'M44 33q6 6 12 0':index===2?'M44 36h12':'M44 38q6-6 12 0';
      art='<circle cx="50" cy="40" r="33" fill="'+colour+'" opacity=".14"/><path d="M32 75V55q0-13 18-13t18 13v20Z" fill="'+(index===4?'#fff':colour)+'" stroke="#455650" stroke-width="2"/><circle cx="50" cy="27" r="13" fill="#ecd5b8" stroke="#455650" stroke-width="2"/><path d="M43 25h1m12 0h1'+face+'" fill="none" stroke="#455650" stroke-width="2" stroke-linecap="round"/>';
      if(index===0)art+='<path d="M72 54q18-14 12-25-15 5-12 25m0 0 8-16" fill="#b6cfac" stroke="#648668" stroke-width="1.5"/>';
      if(index>1)art+='<path d="m17 23 8-14 8 14Z" fill="#efd196" stroke="#9c7852"/><path d="M25 13v4m0 3v.2" stroke="#805c3e" stroke-width="1.8"/>';
      if(index===4)art+='<path d="M33 54h34m-34 8h34m-34 8h34" stroke="#303b38" stroke-width="5"/><path d="M23 10v67m18-67v67m18-67v67m18-67v67M20 10h60m-60 67h60" stroke="#69746f" stroke-width="3"/>';
      return '<svg viewBox="0 0 100 84" aria-hidden="true">'+art+'</svg>';
    }
    if(id==='temperature'){
      art=sun+'<path d="M29 29v28a10 10 0 1 0 14 0V29a7 7 0 0 0-14 0Z" fill="#fff" stroke="#7892ac" stroke-width="2"/><path d="M36 35v29" stroke="'+['#79b5df','#88bb9d','#e7ac57','#df7665'][index]+'" stroke-width="6" stroke-linecap="round"/><circle cx="36" cy="65" r="6" fill="'+['#79b5df','#88bb9d','#e7ac57','#df7665'][index]+'"/>';
      if(index===0)art+='<path d="M75 50v18m-8-14 16 10m-16 0 16-10" stroke="#79b5df" stroke-width="2"/>';
      if(index===3)art+='<path d="M74 54q-5 5 0 10t0 10m9-20q-5 5 0 10t0 10" fill="none" stroke="#df7665" stroke-width="2"/>';
    }else{
      art=(index===0?sun:'')+cloud;
      if(index>0)for(let i=0;i<Math.min(9,index*2+1);i++)art+='<path d="M'+(27+i*7)+' 64l-3 7" stroke="#6a9fc8" stroke-width="2.5" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 100 84" aria-hidden="true">'+art+'</svg>';
  }
  for(const [id,names] of [['temperature',['Cool','Mild','Warm','Hot']],['rain',['Very dry','Light','Moderate','Wet','Very wet']],['humidity',['1','2','3','4','5']],['advisory',['1','2','3','4','5']]]){
    const field=document.querySelector('#builder-'+id),slot=field.closest('.builder-slot'),label=slot.querySelector('.builder-field-label'),choices=[...field.options].slice(1);
    field.hidden=true;field.classList.add('variant-source');field.setAttribute('aria-hidden','true');slot.classList.add('weather-scale-slot');
    const wrap=document.createElement('div');wrap.className='weather-scale';
    const scene=document.createElement('div');scene.className='weather-scale-scene';
    const caption=document.createElement('output');caption.className='weather-scale-caption';caption.setAttribute('aria-live','polite');
    const range=document.createElement('input');range.type='range';range.min='1';range.max=String(choices.length);range.step='1';range.className='weather-scale-range';range.id='builder-'+id+'-range';range.setAttribute('aria-label',id==='humidity'?'Humidity':id==='rain'?'Precipitation':id==='advisory'?'Safety level':'Temperature');label.htmlFor=range.id;
    const steps=document.createElement('div');steps.className='weather-scale-steps';steps.style.setProperty('--weather-steps',choices.length);
    function choose(i){field.value=choices[i].value;field.dispatchEvent(new Event('change',{bubbles:true}));}
    const buttons=choices.map((choice,i)=>{const button=document.createElement('button');button.type='button';button.className='variant-button';button.innerHTML=picture(id,i)+'<span>'+names[i]+'</span>';button.title=choice.textContent;button.setAttribute('aria-label',choice.textContent);button.addEventListener('click',()=>choose(i));steps.append(button);return button;});
    const any=document.createElement('button');any.type='button';any.className='variant-button weather-scale-any';any.textContent='No preference';any.addEventListener('click',()=>{field.value='';field.dispatchEvent(new Event('change',{bubbles:true}));});
    range.addEventListener('input',()=>choose(Number(range.value)-1));range.addEventListener('pointerdown',()=>{if(!field.value)choose(Number(range.value)-1);});range.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(Number(range.value)-1);}});
    function sync(){const index=choices.findIndex(c=>c.value===field.value),selected=index>=0,current=selected?index:1;range.value=String(current+1);range.setAttribute('aria-valuetext',selected?choices[index].textContent:'No preference; move to choose');scene.innerHTML=picture(id,current);scene.classList.toggle('is-unset',!selected);caption.replaceChildren();const text=selected?choices[index].textContent:'No preference',parts=text.match(/^(.*?)\s*(\([^)]*\))$/);if(parts){caption.append(document.createTextNode(parts[1]+' '));const criteria=document.createElement('small');criteria.textContent=parts[2];caption.append(criteria);}else caption.textContent=text;any.setAttribute('aria-pressed',String(!selected));buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(selected&&i===index)));}
    wrap.append(scene,caption,range);if(['temperature','humidity','rain'].includes(id)){const criteria=document.createElement('p');criteria.className='weather-scale-criteria';criteria.textContent=choices.map(c=>c.textContent).join(' · ');wrap.append(criteria);}wrap.append(any);field.after(wrap);form.addEventListener('change',sync);sync();
  }
})();
