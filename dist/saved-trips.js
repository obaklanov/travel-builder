'use strict';
(() => {
  const draftKey = 'travel-builder-pending-trip';
  const names = {"france":"France","united-kingdom":"United Kingdom","turkey":"Türkiye","peru":"Peru","brazil":"Brazil","south-africa":"South Africa","south-korea":"South Korea","australia":"Australia","spain":"Spain","greece":"Greece","costa-rica":"Costa Rica","indonesia":"Indonesia","united-states":"United States","vietnam":"Vietnam","colombia":"Colombia","morocco":"Morocco",mexico:'Mexico',thailand:'Thailand',portugal:'Portugal',japan:'Japan',italy:'Italy',argentina:'Argentina',egypt:'Egypt','new-zealand':'New Zealand'};
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value||'') && Number.isFinite(Date.parse(value+'T12:00:00Z')) && new Date(value+'T12:00:00Z').toISOString().slice(0,10) === value;
  function validTrip(trip) {
    if (!trip || !uuid.test(trip.id) || !names[trip.country] || !['YYZ','YVR','YUL','YYC','YEG'].includes(trip.origin)) return false;
    if (typeof trip.origin_label !== 'string' || !trip.origin_label.trim() || trip.origin_label.length > 160) return false;
    if (!validDate(trip.departure_date) || !validDate(trip.return_date) || !Number.isInteger(trip.days) || trip.days<1 || trip.days>365) return false;
    const span = Math.round((Date.parse(trip.return_date+'T12:00:00Z')-Date.parse(trip.departure_date+'T12:00:00Z'))/86400000)+1;
    return span===trip.days && Number.isFinite(trip.estimated_total) && trip.estimated_total>=0 && trip.estimated_total<1e10 && (trip.budget===null || (Number.isFinite(trip.budget)&&trip.budget>0&&trip.budget<1e10));
  }
  function readDraft() {
    try { const draft=JSON.parse(localStorage.getItem(draftKey)); return validTrip(draft?.trip)&&Date.now()-draft.savedAt<604800000 ? draft.trip : null; } catch {return null;}
  }
  async function saveTripHere(trip,button,status){
        const client=window.TRAVEL_EASY_CLIENT;
        if(!client||!window.TRAVEL_LANDING_ACCOUNT)throw Error('Trip saving is unavailable. Please reload and try again.');
        if(button.dataset.saving==='true')return;
        const save=async session=>{
          button.dataset.saving='true';button.disabled=true;status.textContent='Adding your trip…';
          try{
            const {error}=await client.from('travel_builder_trips').upsert({...trip,user_id:session.user.id},{onConflict:'id'}).select('id').single();
            if(error)throw error;
            const draft=readDraft();if(draft?.id===trip.id)localStorage.removeItem(draftKey);
            // A new suggestion may have been generated while the request was pending.
            if(button.isConnected&&(button.id!=='quick-add-trip'||JSON.parse(document.querySelector('#trip-idea').dataset.trip||'null')?.id===trip.id)){
              status.replaceChildren(document.createTextNode('Added to your planned trips. '));
              const link=document.createElement('a');link.href='profile.html#planned-trips';link.textContent='View planned trips →';status.append(link);button.textContent='Added';
            }
          }catch(error){status.textContent='This trip could not be added. Please try adding it again.';error.tripSave=true;throw error;}
          finally{button.dataset.saving='false';button.disabled=button.textContent==='Added';}
        };
        button.disabled=true;
        const {data,error}=await client.auth.getSession();if(error){button.disabled=false;throw error;}
        if(data.session)await save(data.session);
        else {button.disabled=false;window.TRAVEL_LANDING_ACCOUNT.open(save);}
  }
  document.addEventListener('click', async event => {
    const button=event.target.closest('#add-this-trip, #quick-add-trip');
    if (!button) return;
    const status=document.querySelector(button.id==='quick-add-trip'?'#quick-add-status':'#trip-add-status');
    try {
      if(button.id==='quick-add-trip'){
        const trip=JSON.parse(document.querySelector('#trip-idea').dataset.trip||'null');
        if(!validTrip(trip))throw Error('Please generate a trip first.');
        localStorage.setItem(draftKey,JSON.stringify({trip,savedAt:Date.now()}));
        await saveTripHere(trip,button,status);
        return;
      }
      const params=new URLSearchParams(location.search),key=typeof activeCountry!=='undefined'&&names[activeCountry]?activeCountry:params.get('country');
      if(!names[key])throw Error('Choose a destination first.');
      const state=getBudgetState(key),request=flightRequest(key,state.days);
      const route=getFlightRoutes(key,request)[0];
      if(!state.flightManual)state.rates[0]=route.price;
      const amount=Number(params.get('budget'));
      const trip={id:button.dataset.tripId||(params.get('country')===key&&uuid.test(params.get('tripId')||'')?params.get('tripId'):crypto.randomUUID()),country:key,origin:guideDeparture,origin_label:((params.get('origin')===guideDeparture?params.get('from'):null)||departureCities.find(([code])=>code===guideDeparture)?.[1]||guideDeparture).slice(0,160),departure_date:request.departureDate,return_date:request.returnDate,days:state.days,estimated_total:tripTotalFromRates(state.rates,state.days,state.nights,state.people||1),group_size:state.people||1,budget:amount>0?amount:null,currency:'CAD'};
      if(!validTrip(trip))throw Error('Please check the trip details before adding it.');
      localStorage.setItem(draftKey,JSON.stringify({trip,savedAt:Date.now()}));
      button.dataset.tripId=trip.id;
      await saveTripHere(trip,button,status);
    } catch(error) {if(error.tripSave)return;status.textContent=error.message.includes('trip')?error.message:'Your browser could not keep this trip. Please allow site storage and try again.';}
  });
  const list=document.querySelector('#planned-trip-list');
  if(!list)return;
  const notice=document.querySelector('#pending-trip-notice');
  const status=document.querySelector('#planned-trip-status');
  const client=window.TRAVEL_EASY_CLIENT;
  if(!client){status.textContent='Account connection unavailable. Reload to try again.';return;}
  let serial=0;
  let saving=null;
  const money=value=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(value);
  const setNotice=text=>{notice.textContent=text;notice.hidden=!text;};
  let visibleTrips=[];
  function render(rows,ownerId) {
    visibleTrips=rows;
    list.replaceChildren();
    for(const trip of rows){
      const article=document.createElement('article');article.className='saved-trip-item';
      const title=document.createElement('h3');title.textContent=names[trip.country]||trip.country;
      const origin=document.createElement('p');origin.textContent='From '+trip.origin_label+' ('+trip.origin+')';
      const dates=document.createElement('p');dates.textContent=trip.departure_date+' – '+trip.return_date+' · '+trip.days+' days';
      const cost=document.createElement('p');cost.textContent='Approx. '+money(trip.estimated_total)+' CAD'+((trip.group_size||1)>1?' · '+trip.group_size+' people':'');
      const link=document.createElement('a');link.textContent='View trip →';
      const params=new URLSearchParams({country:trip.country,origin:trip.origin,days:String(trip.days),start:trip.departure_date,end:trip.return_date,tripId:trip.id,from:trip.origin_label,returnTo:'home'});
      params.set('people',String(trip.group_size||1));
      if(trip.budget)params.set('budget',String(trip.budget));
      link.href='destinations.html?'+params;
      const actions=document.createElement('div');actions.className='saved-trip-actions';
      const remove=document.createElement('button');remove.type='button';remove.className='saved-trip-remove';remove.textContent='Remove trip';remove.setAttribute('aria-label','Remove '+title.textContent+' trip');
      const confirmation=document.createElement('div');confirmation.className='saved-trip-confirm';confirmation.hidden=true;
      const prompt=document.createElement('span');prompt.textContent='Remove this planned trip?';
      const confirm=document.createElement('button');confirm.type='button';confirm.textContent='Remove';
      const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Keep trip';
      const feedback=document.createElement('p');feedback.className='saved-trip-feedback';feedback.setAttribute('role','status');
      confirmation.append(prompt,confirm,cancel);actions.append(link,remove);
      remove.addEventListener('click',()=>{confirmation.hidden=false;remove.hidden=true;confirm.focus();});
      cancel.addEventListener('click',()=>{confirmation.hidden=true;remove.hidden=false;feedback.textContent='';remove.focus();});
      confirm.addEventListener('click',async()=>{
        const revision=serial;confirm.disabled=true;cancel.disabled=true;feedback.textContent='Removing…';
        try{
          const {data:auth,error:authError}=await client.auth.getSession();
          if(authError||auth.session?.user.id!==ownerId)throw Error('Account changed');
          const {data,error}=await client.from('travel_builder_trips').delete().eq('id',trip.id).eq('user_id',ownerId).select('id');
          if(error)throw error;if(!data?.some(row=>row.id===trip.id))throw Error('Trip not removed');
          if(revision!==serial)return;
          const pending=readDraft();if(pending?.id===trip.id)localStorage.removeItem(draftKey);
          render(visibleTrips.filter(item=>item.id!==trip.id),ownerId);setNotice('Trip removed from your plans.');
        }catch{
          if(revision===serial)feedback.textContent='This trip could not be removed. Please try again.';
        }finally{confirm.disabled=false;cancel.disabled=false;}
      });
      article.append(title,origin,dates,cost,actions,confirmation,feedback);list.append(article);
    }
    status.textContent=rows.length ? rows.length+' saved '+(rows.length===1?'trip':'trips') : 'No trips planned yet. Explore destinations to start planning your next trip.';
  }
  async function refresh(session) {
    const version=++serial;list.replaceChildren();
    const trip=readDraft();
    if(!session?.user){status.textContent='Sign in to see your trips.';setNotice(trip?'Your '+names[trip.country]+' trip is ready. Sign in or create an account to add it to your profile.':'');return;}
    try {
      if(trip){
        setNotice('Adding your '+names[trip.country]+' trip…');
        if(!saving)saving=client.from('travel_builder_trips').upsert({...trip,user_id:session.user.id},{onConflict:'id'}).select('id').single().finally(()=>{saving=null;});
        const {error}=await saving;if(error)throw error;
        if(version!==serial)return;
        const latest=readDraft();if(latest?.id===trip.id)localStorage.removeItem(draftKey);
        setNotice('Your '+names[trip.country]+' trip has been added to your profile.');
      }
      const {data,error}=await client.from('travel_builder_trips').select('id,country,origin,origin_label,departure_date,return_date,days,estimated_total,budget,currency,group_size').eq('user_id',session.user.id).order('departure_date');
      if(version!==serial)return;
      if(error)throw error;render(data||[],session.user.id);
    }catch(error){
      if(version!==serial)return;
      const setup=['PGRST205','42P01','42501'].includes(error.code);
      status.textContent=setup?'Saved trips are awaiting database setup.':'We couldn’t load your saved trips. Please try again shortly.';
      if(trip)setNotice(setup?'This trip could not be added yet: account trip storage needs setup.':'We couldn’t add this trip to your account yet. Please try again shortly.');
    }
  }
  client.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>refresh(session),0);});
  client.auth.getSession().then(({data,error})=>{if(error)throw error;return refresh(data.session);}).catch(()=>{status.textContent='Please reload to connect your account.';});
})();
