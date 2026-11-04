'use strict';
(() => {
  const form=document.querySelector('#destination-search');if(!form)return;
  const definitions=window.TRAVEL_BUILDER_FILTERS,syncers=[];
  const node=(tag,classes,text)=>{const el=document.createElement(tag);if(classes)el.className=classes;if(text!==undefined)el.textContent=text;return el;};
  const button=(text,label)=>{const el=node('button','variant-button',text);el.type='button';if(label)el.setAttribute('aria-label',label);return el;};
  const choices=field=>[...field.options].map(option=>({value:option.value,label:option.textContent,option}));
  const emit=field=>field.dispatchEvent(new Event('change',{bubbles:true}));
  function source(def){const field=document.querySelector('#builder-'+def.id),slot=field.closest('.builder-slot'),originalLabel=slot.querySelector('.builder-field-label'),label=node('span',originalLabel.className);label.innerHTML=originalLabel.innerHTML;originalLabel.replaceWith(label);label.id='variant-label-'+def.id;field.hidden=true;field.classList.add('variant-source');field.setAttribute('aria-hidden','true');slot.classList.add('variant-slot','variant-'+def.presentation);return {field,slot,label};}
  function labelled(el,label){el.setAttribute('role','group');el.setAttribute('aria-labelledby',label.id);label.removeAttribute('for');}
  const svg=body=>'<svg viewBox="0 0 32 28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+body+'</svg>';
  const person=(x,y=4,small=false)=>'<circle cx="'+x+'" cy="'+y+'" r="'+(small?2.4:3.2)+'"/><path d="M'+(x-(small?3.5:5))+' '+(y+(small?12:17))+'v-4q0-'+(small?6:9)+' '+(small?3.5:5)+'-'+(small?6:9)+'t'+(small?3.5:5)+' '+(small?6:9)+'v4"/>';
  const partyIcons={
    '':svg('<circle cx="16" cy="14" r="10"/><path d="M6 14h20M16 4q-9 10 0 20m0-20q9 10 0 20"/>'),
    Solo:svg(person(16,5)),Couple:svg(person(9,5)+person(23,5)),Friends:svg(person(7,8)+person(16,4)+person(25,8)),Family:svg(person(9,5)+person(23,10,true)),Multigenerational:svg(person(6,7)+person(17,4)+person(27,11,true))
  };
  function singleChoices(def){
    const {field,slot,label}=source(def),group=node('div','variant-choice-group '+(def.presentation==='tiles'?'variant-tiles':'variant-segments'));labelled(group,label);
    for(const choice of choices(field)){
      const short=def.shortLabels?.[choice.value]||choice.label,b=button('',choice.label);b.dataset.variantValue=choice.value;b.title=choice.label;
      if(def.presentation==='tiles'){const image=node('span','variant-choice-icon');image.innerHTML=partyIcons[choice.value]||svg('<path d="M5 21V9h22v12M9 9V5h14v4M12 21v-7h8v7"/>');b.append(image);}
      if(def.presentation==='comfort'){const level=choices(field).findIndex(c=>c.value===choice.value);const image=node('span','variant-comfort-mark');image.setAttribute('aria-hidden','true');image.textContent=level===0?'—':['▰','▰ ▰','▰ ▰ ▰'][level-1];b.append(image);}
      b.append(node('span','',short));b.addEventListener('click',()=>{field.value=choice.value;emit(field);});group.append(b);
    }
    field.after(group);syncers.push(()=>{for(const b of group.children)b.setAttribute('aria-pressed',String(b.dataset.variantValue===field.value));});
    if(def.id==='party'){slot.classList.add('design-primary-wide');}
  }
  function travellers(def){const {field,label}=source(def),group=node('output','traveller-count-display');group.setAttribute('aria-labelledby',label.id);group.setAttribute('aria-live','polite');field.after(group);syncers.push(()=>{group.textContent=field.value==='2'?'2 travellers':'1 traveller';});}
  function radios(def){
    const {field,label}=source(def),group=node('div','variant-radios');group.setAttribute('role','radiogroup');group.setAttribute('aria-labelledby',label.id);label.removeAttribute('for');
    for(const choice of choices(field)){const row=node('label','variant-radio'),input=node('input');input.type='radio';input.name='variant-'+def.id;input.value=choice.value;row.append(input,node('span','',choice.label));input.addEventListener('change',event=>{event.stopPropagation();if(input.checked){field.value=input.value;emit(field);}});group.append(row);}
    field.after(group);syncers.push(()=>{for(const input of group.querySelectorAll('input'))input.checked=input.value===field.value;});
  }
  function binary(def){
    const {field,label}=source(def),row=node('label','variant-switch'),input=node('input');input.id='variant-'+def.id+'-switch';input.type='checkbox';input.setAttribute('role','switch');input.setAttribute('aria-label',def.label);label.removeAttribute('for');row.append(input);field.after(row);
    input.addEventListener('change',event=>{event.stopPropagation();field.value=input.checked?'yes':'';emit(field);});syncers.push(()=>{input.checked=field.value==='yes';});
  }
  function checklist(def){
    const field=document.querySelector('#builder-'+def.id);field.dataset.inline='true';field.open=true;field.classList.add('variant-inline-checklist');field.querySelector('summary').hidden=true;field.querySelector('.builder-interest-options').classList.add('variant-inline-options');syncers.push(()=>{field.open=true;});
  }
  function tags(def){const field=document.querySelector('#builder-'+def.id);field.classList.add('variant-tag-picker');field.querySelector('.builder-interest-options').classList.add('variant-tags');}
  function searchSelect(def){
    const {field,label}=source(def),picker=node('details','variant-search-picker'),summary=node('summary'),panel=node('div','variant-search-panel'),search=node('input'),list=node('div','variant-search-list');
    search.id='variant-destination-search';search.type='search';search.placeholder='Search destinations';search.setAttribute('aria-label','Search destinations');search.autocomplete='off';list.id='variant-destination-list';list.setAttribute('role','listbox');list.setAttribute('aria-label',def.label+' options');summary.setAttribute('aria-haspopup','listbox');label.removeAttribute('for');panel.append(search,list);picker.append(summary,panel);field.after(picker);
    const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
    function paint(){const term=normalize(search.value);list.replaceChildren();let currentGroup=null;for(const choice of choices(field).filter(c=>!c.option.disabled&&normalize(c.label+' '+c.value).includes(term))){const group=choice.option.parentElement.tagName==='OPTGROUP'?choice.option.parentElement.label:'';if(group&&group!==currentGroup){const heading=node('div','variant-search-heading',group);heading.setAttribute('role','presentation');list.append(heading);}currentGroup=group;const b=button(choice.label);if(group)b.classList.add('variant-search-country');b.dataset.variantValue=choice.value;b.setAttribute('role','option');b.setAttribute('aria-selected',String(field.value===choice.value));b.tabIndex=field.value===choice.value?0:-1;b.addEventListener('click',()=>{field.value=choice.value;emit(field);picker.open=false;summary.focus();});list.append(b);}if(!list.children.length)list.append(node('p','variant-empty','No destinations found'));}
    search.addEventListener('input',event=>{event.stopPropagation();paint();});search.addEventListener('change',event=>event.stopPropagation());
    search.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='Enter'){event.preventDefault();const options=[...list.querySelectorAll('button')];if(event.key==='Enter'&&options.length===1)options[0].click();else options[0]?.focus();}});
    list.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;event.preventDefault();const options=[...list.querySelectorAll('button')],index=options.indexOf(document.activeElement),next=Math.max(0,Math.min(options.length-1,index+(event.key==='ArrowDown'?1:-1)));options[next]?.focus();});
    picker.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();picker.open=false;summary.focus();}});
    picker.addEventListener('toggle',()=>{if(picker.open){search.value='';paint();search.focus();}});document.addEventListener('click',event=>{if(!picker.contains(event.target))picker.open=false;});
    syncers.push(()=>{const selected=choices(field).find(c=>c.value===field.value);summary.textContent=selected?.label||'Anywhere';summary.setAttribute('aria-label',def.label+': '+summary.textContent);paint();});
  }
  function money(def){
    const {field,label}=source(def),wrap=node('div','variant-money'),row=node('div','variant-money-row'),amount=node('input'),modeGroup=node('div','variant-money-modes'),clear=button('Any','Any trip budget');let mode='total';
    amount.type='number';amount.min='1';amount.max='1000000';amount.step='1';amount.inputMode='numeric';amount.placeholder='Any budget';amount.id='variant-budget-amount';amount.setAttribute('aria-label','Trip budget amount in CAD');label.htmlFor=amount.id;
    const total=button('Total','Budget for the whole group'),person=button('Per person','Budget per person');modeGroup.setAttribute('role','group');modeGroup.setAttribute('aria-label','Budget basis');modeGroup.append(total,person);row.append(node('span','variant-currency','CAD $'),amount,clear);wrap.append(row,modeGroup);field.after(wrap);
    function commit(){const value=Number(amount.value);field.value=amount.value&&Number.isFinite(value)&&value>0?mode+':'+amount.value:'';emit(field);}
    amount.addEventListener('input',commit);total.addEventListener('click',()=>{mode='total';commit();});person.addEventListener('click',()=>{mode='person';commit();});clear.addEventListener('click',()=>{amount.value='';mode='total';commit();});
    syncers.push(event=>{if(event?.target===form&&!field.value)mode='total';const match=field.value.match(/^(total|person):(\d+(?:\.\d+)?)$/);if(match){mode=match[1];amount.value=match[2];}else if(!field.value)amount.value='';total.setAttribute('aria-pressed',String(mode==='total'));person.setAttribute('aria-pressed',String(mode==='person'));});
  }
  function duration(def){
    const {field,label}=source(def),picker=node('details','variant-duration-picker'),summary=node('summary'),panel=node('div','variant-duration-panel'),numbers=node('div','variant-duration-numbers'),track=node('div','variant-dual-track'),bar=node('div','variant-dual-bar'),min=node('input'),max=node('input'),low=node('input'),high=node('input');
    label.removeAttribute('for');summary.setAttribute('aria-label','Trip length');
    for(const [input,name,id] of [[min,'Minimum days','min'],[max,'Maximum days','max']]){input.type='number';input.min='1';input.max='90';input.step='1';input.id='variant-days-'+id;input.setAttribute('aria-label',name);const l=node('label','',name);l.append(input);numbers.append(l);}
    for(const [input,name,id] of [[low,'Minimum trip length','low'],[high,'Maximum trip length','high']]){input.type='range';input.min='1';input.max='90';input.step='1';input.className='variant-range';input.id='variant-days-'+id;input.setAttribute('aria-label',name);}
    track.append(bar,low,high);const presetGroup=node('div','variant-duration-presets');presetGroup.setAttribute('role','group');presetGroup.setAttribute('aria-label','Trip length presets');for(const [text,value] of [['4–6 days','4-6'],['7–9 days','7-9'],['2 weeks','13-15'],['3 weeks','20-23']]){const b=button(text);b.addEventListener('click',()=>{field.value=value;emit(field);});presetGroup.append(b);}
    const any=button('Any length');any.addEventListener('click',()=>{field.value='';emit(field);});panel.append(numbers,track,presetGroup,any);picker.append(summary,panel);field.after(picker);
    function commit(changed){let a=Number(changed===min?min.value:low.value),b=Number(changed===max?max.value:high.value);if(!Number.isInteger(a)||!Number.isInteger(b)||a<1||b>90)return;if(changed===low||changed===min)a=Math.min(a,b);else b=Math.max(a,b);field.value=a+'-'+b;emit(field);}
    low.addEventListener('input',()=>commit(low));high.addEventListener('input',()=>commit(high));min.addEventListener('change',event=>{event.stopPropagation();commit(min);});max.addEventListener('change',event=>{event.stopPropagation();commit(max);});
    for(const input of [low,high])input.addEventListener('pointerdown',()=>{if(!field.value)commit(input);});
    picker.addEventListener('keydown',event=>{if(event.key==='Escape'){picker.open=false;summary.focus();}if(event.key==='Enter'&&(event.target===min||event.target===max)){event.preventDefault();commit(event.target);}});document.addEventListener('click',event=>{if(!picker.contains(event.target))picker.open=false;});
    syncers.push(()=>{const values=field.value?window.TRAVEL_BUILDER_ENGINE.durationValues(field.value):[];let a=values[0]||7,b=values.at(-1)||14;low.value=min.value=String(a);high.value=max.value=String(b);low.setAttribute('aria-valuetext',a+' days minimum');high.setAttribute('aria-valuetext',b+' days maximum');summary.textContent=values.length?(a===b?a+' days':a+'–'+b+' days'):'Any length';summary.setAttribute('aria-label','Trip length: '+summary.textContent);track.style.setProperty('--range-start',((a-1)/89*100)+'%');track.style.setProperty('--range-end',((b-1)/89*100)+'%');track.classList.toggle('is-unset',!values.length);});
  }
  function journey(def){
    const {field,label}=source(def),wrap=node('div','variant-journey'),top=node('div','variant-range-caption'),value=node('output'),any=button('Any','Any journey time'),range=node('input'),ends=node('div','variant-range-ends');range.type='range';range.min='1';range.max='60';range.step='1';range.className='variant-range';range.id='variant-flightHours-range';range.setAttribute('aria-label','Maximum journey time');label.htmlFor=range.id;top.append(value,any);ends.append(node('span','','1 hour'),node('span','','60 hours'));wrap.append(top,range,ends);field.after(wrap);
    const choose=()=>{field.value=range.value;emit(field);};range.addEventListener('input',choose);range.addEventListener('pointerdown',()=>{if(!field.value)choose();});range.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose();}});any.addEventListener('click',()=>{field.value='';emit(field);});syncers.push(()=>{range.value=field.value||'12';value.textContent=field.value?field.value+' h max':'Any duration';range.setAttribute('aria-valuetext',field.value?field.value+' hours maximum':'Any duration; move to choose');wrap.classList.toggle('is-unset',!field.value);});
  }
  const builders={tiles:singleChoices,segments:singleChoices,comfort:singleChoices,travellers,radios,switch:binary,checklist,tags,search:searchSelect,money,duration,journey};
  for(const def of definitions)if(builders[def.presentation])builders[def.presentation](def);
  const expand=button('Show all options');expand.id='builder-toggle-extras';expand.classList.add('variant-expand-all');const extras=()=>[...document.querySelectorAll('.design-more')];document.querySelector('#builder-reset-all').before(expand);
  function syncExpand(){const all=extras().every(el=>el.open);expand.textContent=all?'Hide extra options':'Show all options';expand.setAttribute('aria-expanded',String(all));}
  expand.addEventListener('click',()=>{const open=!extras().every(el=>el.open);for(const el of extras())el.open=open;syncExpand();});for(const el of extras())el.addEventListener('toggle',syncExpand);
  form.addEventListener('change',event=>{if(event.target===form){for(const details of form.querySelectorAll('.variant-search-picker,.variant-duration-picker'))details.open=false;}for(const sync of syncers)sync(event);syncExpand();});
  for(const sync of syncers)sync();syncExpand();document.body.classList.add('filter-showcase');
})();
