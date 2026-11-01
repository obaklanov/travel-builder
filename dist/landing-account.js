'use strict';
(() => {
  const config=window.TRAVEL_ATLAS_ACCOUNT;
  if(!window.supabase||!config)return;
  const client=window.TRAVEL_EASY_CLIENT=window.supabase.createClient(config.url,config.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:'travel-easy-auth'}});
  const $=selector=>document.querySelector(selector),dialog=$('#trip-account-dialog');
  let saveTrip=null,mode='signin',busy=false;
  function choose(next){mode=next;$('#trip-account-name-row').hidden=next!=='signup';$('#trip-account-password').autocomplete=next==='signup'?'new-password':'current-password';$('#trip-account-submit').textContent=next==='signup'?'Create free account':'Log in and save trip';for(const key of ['signin','signup'])$('#trip-account-'+key).setAttribute('aria-selected',String(key===next));$('#trip-account-message').textContent='';}
  window.TRAVEL_LANDING_ACCOUNT={open(callback){saveTrip=callback;choose('signin');dialog.showModal();}};
  $('#trip-account-signin').addEventListener('click',()=>{if(!busy)choose('signin');});
  $('#trip-account-signup').addEventListener('click',()=>{if(!busy)choose('signup');});
  $('#trip-account-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{$('#trip-account-password').value='';});
  $('#trip-account-form').addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;
    const email=$('#trip-account-email').value.trim(),password=$('#trip-account-password').value,name=$('#trip-account-name').value.trim();
    const tell=text=>$('#trip-account-message').textContent=text;
    if(mode==='signup'&&!/^[A-Za-z0-9_]{3,24}$/.test(name)){tell('Choose a name with 3–24 letters, numbers or underscores.');return;}
    if(mode==='signup'&&!(password.length>=8&&/[A-Za-z]/.test(password)&&/[0-9]/.test(password)&&/[^A-Za-z0-9\s]/.test(password))){tell('Use at least 8 characters, including a letter, a number and a symbol.');return;}
    const onSignedIn=saveTrip;
    busy=true;$('#trip-account-submit').disabled=true;tell(mode==='signup'?'Creating your free account…':'Logging in…');
    try{
      const result=mode==='signup'?await client.auth.signUp({email,password,options:{data:{nickname:name},emailRedirectTo:new URL('profile.html',location.href).href}}):await client.auth.signInWithPassword({email,password});
      if(result.error)throw result.error;
      $('#trip-account-password').value='';
      if(result.data.session){await onSignedIn(result.data.session);dialog.close();}
      else tell('Check your email to confirm your free account, then log in. Your suggested trip is ready to save.');
    }catch(error){tell(error.code==='invalid_credentials'?'Email or password not recognised. Please try again.':error.code==='email_not_confirmed'?'Confirm your email first, then log in.':error.code==='over_email_send_rate_limit'?'Please wait a little before requesting another email.':error.tripSave?'You’re logged in, but the trip could not be added. Close this window and try Add Now again.':'We couldn’t complete that request. Please try again.');}
    finally{busy=false;$('#trip-account-submit').disabled=false;}
  });
})();
