'use strict';
(() => {
  const draftKey = 'travel-easy-pending-trip';
  const names = {mexico:'Mexico',thailand:'Thailand',portugal:'Portugal',japan:'Japan',italy:'Italy',argentina:'Argentina',egypt:'Egypt','new-zealand':'New Zealand'};
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
  document.addEventListener('click', event => {
    const button=event.target.closest('#add-this-trip, #quick-add-trip');
    if (!button) return;
    const status=document.querySelector(button.id==='quick-add-trip'?'#quick-add-status':'#trip-add-status');
    try {
      if(button.id==='quick-add-trip'){
        const trip=JSON.parse(document.querySelector('#trip-idea').dataset.trip||'null');
        if(!validTrip(trip))throw Error('Please generate a trip first.');
        localStorage.setItem(draftKey,JSON.stringify({trip,savedAt:Date.now()}));
        location.href='profile.html?addTrip=1';
        return;
      }
      const params=new URLSearchParams(location.search),key=params.get('country');
      if(!names[key])throw Error('Choose a destination first.');
      const state=getBudgetState(key),request=flightRequest(key,state.days);
      const route=getFlightRoutes(key,request)[0];
      if(!state.flightManual)state.rates[0]=route.price;
      const amount=Number(params.get('budget'));
      const trip={id:uuid.test(params.get('tripId')||'')?params.get('tripId'):crypto.randomUUID(),country:key,origin:guideDeparture,origin_label:(params.get('from')||departureCities.find(([code])=>code===guideDeparture)?.[1]||guideDeparture).slice(0,160),departure_date:request.departureDate,return_date:request.returnDate,days:state.days,estimated_total:tripTotalFromRates(state.rates,state.days,state.nights),budget:amount>0?amount:null,currency:'CAD'};
      if(!validTrip(trip))throw Error('Please check the trip details before adding it.');
      localStorage.setItem(draftKey,JSON.stringify({trip,savedAt:Date.now()}));
      location.href='profile.html?addTrip=1';
    } catch(error) {status.textContent=error.message.includes('trip')?error.message:'Your browser could not keep this trip. Please allow site storage and try again.';}
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
  function render(rows) {
    list.replaceChildren();
    for(const trip of rows){
      const article=document.createElement('article');article.className='saved-trip-item';
      const title=document.createElement('h3');title.textContent=names[trip.country]||trip.country;
      const origin=document.createElement('p');origin.textContent='From '+trip.origin_label+' ('+trip.origin+')';
      const dates=document.createElement('p');dates.textContent=trip.departure_date+' – '+trip.return_date+' · '+trip.days+' days';
      const cost=document.createElement('p');cost.textContent='Approx. '+money(trip.estimated_total)+' CAD';
      const link=document.createElement('a');link.textContent='View trip →';
      const params=new URLSearchParams({country:trip.country,origin:trip.origin,days:String(trip.days),start:trip.departure_date,end:trip.return_date,tripId:trip.id,from:trip.origin_label,returnTo:'home'});
      if(trip.budget)params.set('budget',String(trip.budget));
      link.href='destinations.html?'+params;
      article.append(title,origin,dates,cost,link);list.append(article);
    }
    status.textContent=rows.length ? rows.length+' saved '+(rows.length===1?'trip':'trips') : 'No trips saved yet. Create one from Home.';
  }
  async function refresh(session) {
    const version=++serial;list.replaceChildren();
    const trip=readDraft();
    if(!session?.user){status.textContent='Sign in to see your trips.';setNotice(trip?'Your '+names[trip.country]+' trip is ready. Sign in or create an account to add it to your profile.':'');return;}
    try {
      if(trip){
        setNotice('Adding your '+names[trip.country]+' trip…');
        if(!saving)saving=client.from('travel_easy_trips').upsert({...trip,user_id:session.user.id},{onConflict:'id'}).select('id').single().finally(()=>{saving=null;});
        const {error}=await saving;if(error)throw error;
        if(version!==serial)return;
        const latest=readDraft();if(latest?.id===trip.id)localStorage.removeItem(draftKey);
        setNotice('Your '+names[trip.country]+' trip has been added to your profile.');
      }
      const {data,error}=await client.from('travel_easy_trips').select('id,country,origin,origin_label,departure_date,return_date,days,estimated_total,budget,currency').eq('user_id',session.user.id).order('departure_date');
      if(version!==serial)return;
      if(error)throw error;render(data||[]);
    }catch(error){
      if(version!==serial)return;
      const setup=['PGRST205','42P01','42501'].includes(error.code);
      status.textContent=setup?'Saved trips are awaiting database setup.':'Trips could not load. Reload to try again.';
      if(trip)setNotice(setup?'Your trip is kept in this browser. Account saving needs the saved-trips database setup.':'Your trip is kept in this browser. We couldn’t save it yet; reload to try again.');
    }
  }
  client.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>refresh(session),0);});
  client.auth.getSession().then(({data,error})=>{if(error)throw error;return refresh(data.session);}).catch(()=>{status.textContent='Please reload to connect your account.';});
})();
