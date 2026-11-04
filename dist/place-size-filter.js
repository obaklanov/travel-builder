'use strict';
(() => {
  const field=document.querySelector('#builder-placeSize');
  if(!field)return;
  const root=field.closest('.place-size-slot'),form=field.closest('form');
  const range=root.querySelector('.place-size-range'),scene=root.querySelector('.place-size-scene'),image=scene.querySelector('img');
  const caption=root.querySelector('output'),any=root.querySelector('.place-size-any'),steps=[...root.querySelectorAll('[data-place-size-step]')];
  const choices=[...field.options].slice(1).map(option=>({value:option.value,label:option.textContent}));
  function sync(){
    const index=choices.findIndex(choice=>choice.value===field.value),selected=index>=0;
    range.value=String(selected?index+1:3);
    range.setAttribute('aria-valuetext',selected?choices[index].label:'No preference; move the slider to choose');
    caption.textContent=selected?(index+1)+' · '+choices[index].label:'No preference';
    any.setAttribute('aria-pressed',String(!selected));
    scene.classList.toggle('is-unset',!selected);
    scene.setAttribute('aria-label',selected?choices[index].label+' illustration':'No place size preference');
    image.src='images/place-size-'+range.value+'.svg';
    for(const button of steps)button.setAttribute('aria-pressed',String(selected&&Number(button.dataset.placeSizeStep)===index+1));
  }
  function choose(step){
    const choice=choices[step-1];if(!choice)return;
    const changed=field.value!==choice.value;field.value=choice.value;
    field.dispatchEvent(new Event('change',{bubbles:true}));
    if(changed&&typeof image.animate==='function'&&!matchMedia('(prefers-reduced-motion: reduce)').matches)image.animate([{transform:'translateY(3px) scale(.98)'},{transform:'translateY(0) scale(1)'}],{duration:180,easing:'ease-out'});
  }
  range.addEventListener('input',()=>choose(Number(range.value)));
  // A click at the neutral slider's middle must also choose City, even if its native value has not moved.
  range.addEventListener('pointerdown',()=>{if(!field.value)choose(Number(range.value));});
  range.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(Number(range.value));}});
  for(const button of steps)button.addEventListener('click',()=>choose(Number(button.dataset.placeSizeStep)));
  any.addEventListener('click',()=>{field.value='';field.dispatchEvent(new Event('change',{bubbles:true}));});
  form.addEventListener('change',sync);
  sync();
})();
