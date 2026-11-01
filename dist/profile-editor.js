'use strict';
(() => {
  const validPassword=value=>value.length>=8&&/[A-Za-z]/.test(value)&&/[0-9]/.test(value)&&/[^A-Za-z0-9\s]/.test(value);
  function init(client,getState,onNameSaved){
    const $=selector=>document.querySelector(selector),dialog=$('#edit-profile-dialog');
    if(!dialog)return;
    let verified='',checkRevision=0,busy=false;
    const tell=(id,text,tone='')=>{const node=$(id);node.textContent=text;node.dataset.tone=tone;};
    const resetPasswords=()=>$('#edit-password-form').reset();
    $('#edit-profile-button').addEventListener('click',()=>{
      const {user,profile}=getState();if(!user)return;
      $('#edit-profile-name').value=profile?.nickname||user.user_metadata?.nickname||'';
      verified='';$('#save-profile-name').disabled=true;checkRevision++;resetPasswords();
      tell('#profile-name-feedback','');tell('#profile-password-feedback','');dialog.showModal();
    });
    $('#close-edit-profile').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
    dialog.addEventListener('close',()=>{checkRevision++;verified='';resetPasswords();});
    $('#edit-profile-name').addEventListener('input',()=>{checkRevision++;verified='';$('#save-profile-name').disabled=true;tell('#profile-name-feedback','');});
    $('#check-profile-name').addEventListener('click',async()=>{
      const name=$('#edit-profile-name').value.trim(),revision=++checkRevision;
      verified='';$('#save-profile-name').disabled=true;
      if(!/^[A-Za-z0-9_]{3,24}$/.test(name)){tell('#profile-name-feedback','Use 3–24 letters, numbers or underscores.','error');return;}
      tell('#profile-name-feedback','Checking…');
      try{
        const {data,error}=await client.rpc('travel_easy_name_available',{candidate:name});
        if(revision!==checkRevision||!dialog.open)return;if(error)throw error;
        if(data===true){verified=name;$('#save-profile-name').disabled=false;tell('#profile-name-feedback','This name is available. You can save it.','success');}
        else tell('#profile-name-feedback','That name is already taken. Try another.','error');
      }catch{if(revision===checkRevision)tell('#profile-name-feedback','Name availability could not be checked. Please try again.','error');}
    });
    $('#edit-name-form').addEventListener('submit',async event=>{
      event.preventDefault();const {user,profile}=getState(),name=$('#edit-profile-name').value.trim();
      if(!user||busy||name!==verified)return;
      busy=true;$('#save-profile-name').disabled=true;
      try{
        const payload={id:user.id,nickname:name,visited_countries:profile?.visited_countries||[]};
        const query=profile ? client.from('traveller_profiles').update({nickname:name}).eq('id',user.id) : client.from('traveller_profiles').upsert(payload,{onConflict:'id'});
        const {data,error}=await query.select('id,nickname,visited_countries,updated_at').single();
        if(error)throw error;if(getState().user?.id!==user.id)return;
        onNameSaved(data);tell('#profile-name-feedback','Your profile name has been updated.','success');verified='';
      }catch(error){verified='';tell('#profile-name-feedback',error.code==='23505'?'That name was just taken. Please check another name.':'Your profile name could not be saved. Please try again.','error');}
      finally{busy=false;}
    });
    $('#edit-password-form').addEventListener('submit',async event=>{
      event.preventDefault();if(busy||!getState().user)return;
      const current=$('#current-profile-password').value,password=$('#new-profile-password').value,confirm=$('#confirm-profile-password').value;
      if(!current){tell('#profile-password-feedback','Enter your current password.','error');return;}
      if(!validPassword(password)){tell('#profile-password-feedback','Use at least 8 characters, including a letter, a number and a symbol.','error');return;}
      if(password!==confirm){tell('#profile-password-feedback','The new passwords don’t match.','error');return;}
      if(password===current){tell('#profile-password-feedback','Choose a different new password.','error');return;}
      busy=true;$('#save-profile-password').disabled=true;tell('#profile-password-feedback','Updating password…');
      try{
        const owner=getState().user;
        const verified=await client.auth.signInWithPassword({email:owner.email,password:current});
        if(verified.error)throw verified.error;
        if(verified.data.user?.id!==owner.id||getState().user?.id!==owner.id)throw new Error('Account changed');
        const {error}=await client.auth.updateUser({password,current_password:current});if(error)throw error;
        resetPasswords();tell('#profile-password-feedback','Your password has been changed.','success');
      }catch(error){
        const wrong=['invalid_credentials','invalid_password','reauthentication_needed'].includes(error.code);
        tell('#profile-password-feedback',wrong?'Your current password could not be verified. Please check it and try again.':error.code==='weak_password'?'Your new password does not meet the account password requirements.':'Your password could not be updated. Please try again.','error');
        $('#current-profile-password').value='';
      }finally{busy=false;$('#save-profile-password').disabled=false;}
    });
    client.auth.onAuthStateChange((event,session)=>{if(!session&&dialog.open)dialog.close();});
  }
  window.TRAVEL_PROFILE_EDITOR={init,validPassword};
})();
