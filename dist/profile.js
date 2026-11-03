'use strict';

// Passwords go only to Supabase Authentication and are never saved by this page.
(() => {
  const $ = selector => document.querySelector(selector);
  const status = $('#account-status');
  const config = window.TRAVEL_ATLAS_ACCOUNT;
  let client;
  let user = null;
  let profile = null;
  let catalogue = [];
  let allowedCodes = new Set();
  let selected = new Set();
  let legacySelected = new Set();
  let mapPaths = [];
  let pendingOutlineLayer = null;
  let mapZoom = null;
  let countryColors = {};
  let countryInfo = {};
  let mapCountryCode=null, savingCountries=false, mapDraftCode=null;
  function updateMapAddButton(){
    const button=$('#map-add-country');if(!button)return;
    const saved=profile?.visited_countries?.includes(mapCountryCode);
    button.hidden=!mapCountryCode;
    button.disabled=!user||!storageReady||savingCountries||saved;
    button.textContent=savingCountries?'Saving…':saved?'Already travelled':'Add to travelled';
  }
  const travelCountryCode=code=>catalogue.find(c=>c.code===code)?.parentCountry||code;
  function showCountryInfo(code) {
    code=travelCountryCode(code);
    mapCountryCode=code;
    const country=catalogue.find(c=>c.code===code), panel=$("#map-country-info");
    if(!country || !panel)return;
    panel.replaceChildren();
    const heading=document.createElement("strong"), details=document.createElement("p");
    heading.textContent=country.name;
    const facts=countryInfo[code];
    const compact=value=>new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(value);
    details.textContent=country.region+(facts ? '. Population '+compact(facts.population)+(facts.populationRank?' (Rank '+facts.populationRank+'/'+facts.populationCount+')':'')+'. Area '+(facts.area===0?'<1':compact(facts.area))+' km\u00b2'+(facts.areaRank?' (Rank '+facts.areaRank+'/'+facts.areaCount+')':'')+'.' : '.');
    panel.append(heading,details);panel.hidden=false;updateMapAddButton();
  }
  let celebrationPending = new Set();
  let dirty = false;
  let loaded = false;
  let revision = 0;
  let recoveryMode = new URLSearchParams(location.search).get('reset') === '1';
  let confirmationEmail = '';
  let activeTab = 'signup';
  let storageReady = false;
  const nicknamePattern = /^[A-Za-z0-9_]{3,24}$/;

  function message(text = '', tone = 'info') {
    status.textContent = text;
    status.dataset.tone = tone;
  }

  function friendlyError(error) {
    if (['PGRST205', '42P01', '42501'].includes(error?.code)) return 'Your account is connected, but profile storage is not ready. Finish the database setup in Supabase, then reload this page.';
    if (error?.code === '23505') return 'That nickname is already in use. Try a different nickname and save again.';
    if (error?.code === '23514') return 'Check your nickname and country selections, then try saving again.';
    if (error?.code === 'email_not_confirmed') return 'Please confirm your email using the link in your inbox, then sign in.';
    if (error?.code === 'invalid_credentials') return 'That email and password combination was not recognised. Check your details or reset your password.';
    if (['over_email_send_rate_limit', 'over_request_rate_limit'].includes(error?.code) || error?.status === 429) return 'Too many requests in a short time. Please wait a little before trying again.';
    if (error?.code === 'weak_password') return 'Use at least 8 characters, including a letter, a number and a symbol.';
    if (error?.code === 'same_password') return 'Please choose a password different from your current password.';
    if (error?.code === 'signup_disabled') return 'New account registration is currently unavailable.';
    if (error?.code === 'email_address_not_authorized') return 'Email delivery is not yet set up for this address. The site owner needs to configure authentication email before inviting testers.';
    if (error instanceof TypeError || /fetch|network/i.test(error?.message || '')) return 'We couldn’t connect. Check your internet connection and try again.';
    return 'We couldn’t complete that request. Please try again. If it keeps happening, contact the site owner.';
  }

  async function busy(form, action) {
    const buttons = [...form.querySelectorAll('button')];
    buttons.forEach(button => button.disabled = true);
    form.setAttribute('aria-busy', 'true');
    try { await action(); }
    catch (error) { message(friendlyError(error), 'error'); }
    finally {
      buttons.forEach(button => button.disabled = false);
      form.removeAttribute('aria-busy');
      form.querySelectorAll('input[type="password"], input[data-password-visible="true"]').forEach(input => {
        input.value = '';
        input.type = 'password';
        delete input.dataset.passwordVisible;
      });
      form.querySelectorAll('[data-password]').forEach(button => {
        button.textContent = 'Show';
        button.setAttribute('aria-label', 'Show password');
      });
    }
  }

  function chooseTab(name, focus = false) {
    activeTab = name;
    for (const tab of ['signup', 'signin']) {
      const button = $('#' + tab + '-tab');
      const active = tab === name;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      $('#' + tab + '-panel').hidden = !active;
      if (active && focus) button.focus();
    }
  }

  function redirectUrl(reset = false) {
    const url = new URL('profile.html', location.href);
    url.search = reset ? '?reset=1' : '';
    url.hash = '';
    return url.href;
  }

  function setDirty(value) {
    dirty = value;
    $('#save-state').textContent = value ? 'Unsaved changes' : profile ? 'Saved to your account' : 'Your first chapter';
  }

  function updateMap() {
    const countriesVisited=catalogue.filter(c=>c.classification==='country'&&selected.has(c.code)).length;
    $('#visited-count').textContent = String(countriesVisited);
    $('#visited-count-note').textContent = countriesVisited+' of '+catalogue.filter(c=>c.classification==='country').length+' countries and self-governing states · '+(selected.size-countriesVisited)+' territories or other destinations';
    $('#unselect-all').checked = selected.size === 0;
    $('#unselect-all').disabled = selected.size === 0;
    $('#visited-world-map').setAttribute('aria-label', 'World map: ' + selected.size + ' countries and territories selected as visited.');
    const saved = new Set(profile?.visited_countries || []);
    pendingOutlineLayer?.replaceChildren();
    for (const [path, code] of mapPaths) {
      path.style.setProperty('--country-color', countryColors[code] || '#82afd0');
      path.setAttribute('aria-pressed', String(selected.has(code)));
      path.classList.toggle('visited', selected.has(code) && saved.has(code) && !celebrationPending.has(code));
      const pending = selected.has(code) && !saved.has(code);
      path.classList.toggle('pending-visit', pending);
      if (pending && pendingOutlineLayer) {
        const outline = document.createElementNS('http://www.w3.org/2000/svg','path');
        outline.setAttribute('d',path.getAttribute('d'));
        outline.setAttribute('class','pending-country-outline');
        pendingOutlineLayer.append(outline);
      }
    }
  }

  function renderCountries() {
    const normalise = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
    const query = normalise($('#country-search').value.trim());
    const selectedOnly = $('#selected-only').checked;
    const matches = catalogue.filter(country => (selectedOnly || query) && (country.classification==='country'||$('#include-territories').checked) && (!selectedOnly || selected.has(travelCountryCode(country.code))) && (!query || [country.name, country.code, country.iso2, ...(country.aliases || [])].some(value => normalise(value || '').startsWith(query))));
    const list = $('#visited-country-list');
    list.replaceChildren();
    list.closest('fieldset').hidden = !query && !selectedOnly;
    $('#country-result-count').textContent = query || selectedOnly ? matches.length + ' matches · ' + selected.size + ' selected' : selected.size + ' selected';
    for (const country of matches) {
      const label = document.createElement('label');
      label.className = 'country-choice';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = travelCountryCode(country.code);
      checkbox.checked = selected.has(travelCountryCode(country.code));
      const name = document.createElement('span');
      name.textContent = country.name+(country.parentCountry?' ('+catalogue.find(c=>c.code===country.parentCountry).name+')':'');
      label.append(checkbox, name);
      checkbox.addEventListener('change', () => setCountrySelection(country.code,checkbox.checked,selectedOnly));
      list.append(label);
    }
    if (!matches.length && (query || selectedOnly)) {
      const empty = document.createElement('p');
      empty.className = 'country-empty';
      empty.textContent = selectedOnly ? 'No selected places match this search.' : 'No places match this search.';
      list.append(empty);
    }
  }

  function selectMapCountry(code){
    code=travelCountryCode(code);
    if(!user||!storageReady||!allowedCodes.has(code))return;
    if(!$('#include-territories').checked && catalogue.find(c=>c.code===code)?.classification!=='country'){return;}
    if(mapCountryCode===code){
      if(mapDraftCode===code&&!profile?.visited_countries?.includes(code))selected.delete(code);
      mapDraftCode=null;mapCountryCode=null;
      $('#map-country-info').hidden=true;updateMapAddButton();setDirty(true);updateMap();renderCountries();return;
    }
    // Replace only the unsaved selection made by the map; keep saved visits and list choices.
    if(mapDraftCode&&mapDraftCode!==code&&!profile?.visited_countries?.includes(mapDraftCode))selected.delete(mapDraftCode);
    if(!selected.has(code)){selected.add(code);mapDraftCode=code;}
    else if(mapDraftCode!==code)mapDraftCode=null;
    showCountryInfo(code);setDirty(true);updateMap();renderCountries();
  }

  function setCountrySelection(code,checked,refreshList=true) {
    code=travelCountryCode(code);
    if (!user || !storageReady || !allowedCodes.has(code)) return;
    if (checked) selected.add(code); else selected.delete(code);
    setDirty(true);
    updateMap();
    if (refreshList) renderCountries();
    else $('#country-result-count').textContent = document.querySelectorAll('.country-choice').length + ' matches · ' + selected.size + ' selected';
  }

  async function loadGeography() {
    const [catalogueResponse, mapResponse, colorResponse] = await Promise.all([fetch('country-catalog.json?v=canada-policy-198-1'), fetch('profile-country-outlines.json?v=kosovo-included-1'), fetch('country-colors.json?v=kosovo-1')]);
    if (!catalogueResponse.ok || !mapResponse.ok || !colorResponse.ok) throw new Error('Country data unavailable');
    catalogue = await catalogueResponse.json();
    const outlines = await mapResponse.json();
    countryColors = (await colorResponse.json()).colors;
    try {const response=await fetch('profile-country-info.json?v=canada-policy-198-1');if(response.ok)countryInfo=await response.json();} catch {}
    window.TRAVEL_SCRATCH?.init(outlines,countryColors,catalogue);
    allowedCodes = new Set(catalogue.map(country => country.code));
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 10 1000 465');
    svg.setAttribute('role','group');
    svg.setAttribute('aria-label','Select travelled countries on the map');
    const aliases = { SDS: 'SSD', KOS: 'UNK' };
    for (const feature of outlines.features) {
      const geometry = feature.geometry;
      if (feature.id === 'ATA' || !['Polygon', 'MultiPolygon'].includes(geometry.type)) continue;
      const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', polygons.map(polygon => polygon.map(ring => ring.map(([lon, lat], i) => (i ? 'L' : 'M') + ((lon + 180) * 1000 / 360).toFixed(2) + ',' + ((90 - lat) * 1000 / 360).toFixed(2)).join(' ') + 'Z').join(' ')).join(' '));
      path.setAttribute('fill-rule', 'evenodd');
      const title = document.createElementNS(ns, 'title');
      title.textContent = feature.properties.name;
      path.append(title);
      const originalCode = aliases[feature.id] || feature.id;
      const code = travelCountryCode(originalCode);
      if(code!==originalCode){title.textContent=feature.properties.name+' ('+catalogue.find(c=>c.code===code).name+')';}
      path.dataset.country = code;
      path.setAttribute('id','profile-country-' + originalCode);
      path.setAttribute('role','button');
      path.setAttribute('tabindex','0');
      path.setAttribute('aria-label',title.textContent);
      path.setAttribute('aria-pressed','false');
      path.addEventListener('click', () => {if(svg.dataset.suppressSelection!=='true'){selectMapCountry(code);}});
      path.addEventListener('keydown', event => {
        if (event.key==='Enter' || event.key===' ') {
          event.preventDefault();
          selectMapCountry(code);
        }
      });
      mapPaths.push([path, code]);
      svg.append(path);
    }
    pendingOutlineLayer = document.createElementNS(ns,'g');
    pendingOutlineLayer.setAttribute('aria-hidden','true');
    pendingOutlineLayer.setAttribute('class','pending-country-outlines');
    svg.append(pendingOutlineLayer);
    $('#visited-world-map').replaceChildren(svg);
    mapZoom = window.TRAVEL_MAP_ZOOM?.attach(svg,$('#visited-world-map'),$('.visited-map-card'));
  }

  async function displaySession(session, force = false) {
    const nextUser = session?.user || null;
    if (!force && nextUser && nextUser.id === user?.id && loaded && !recoveryMode) {
      user = nextUser;
      return;
    }
    const currentRevision = ++revision;
    window.TRAVEL_SCRATCH?.cancel();
    celebrationPending.clear();
    mapZoom?.reset();
    if($('#map-country-info'))$('#map-country-info').hidden=true;
    mapCountryCode=null;mapDraftCode=null;updateMapAddButton();
    user = nextUser;
    loaded = false;
    storageReady = false;
    profile = null;
    selected = new Set();
    legacySelected = new Set();
    $('#account-gate').hidden = true;
    $('#traveller-profile').hidden = true;
    $('#password-recovery').hidden = true;
    if (!user) {
      recoveryMode = false;
      $('#account-gate').hidden = false;
      $('#traveller-title').textContent = 'Your personal Atlas';
      $('#visited-country-list').replaceChildren();
      updateMap();
      setDirty(false);
      if (!confirmationEmail) message('');
      return;
    }
    if (recoveryMode) {
      $('#password-recovery').hidden = false;
      message('Enter a new password to regain access to your atlas.');
      return;
    }
    message('Opening your atlas…');
    await geographyReady;
    if (currentRevision !== revision) return;
    const { data, error } = await client.from('travel_builder_profiles').select('id,nickname,visited_countries,updated_at').eq('id', user.id).maybeSingle();
    if (currentRevision !== revision) return;
    if (error) {
      message(friendlyError(error), 'error');
    } else {
      storageReady = true;
      profile = data;
      selected = new Set((data?.visited_countries || []).map(travelCountryCode).filter(code => allowedCodes.has(code)));
      if(data)data.visited_countries=[...new Set((data.visited_countries||[]).map(travelCountryCode))];
      // Preserve earlier saved places outside the current Worldometer catalogue.
      legacySelected = new Set((data?.visited_countries || []).filter(code => !allowedCodes.has(code)));
      message(data ? '' : 'Welcome aboard. Choose the countries and territories you’ve visited, then save your profile.', 'success');
    }
    $('#traveller-title').textContent = data?.nickname ? data.nickname + '’s Atlas' : 'Your personal Atlas';
    $('#save-profile').disabled = !storageReady;
    $('#country-search').value = '';
    $('#selected-only').checked = false;
    $('#traveller-profile').hidden = false;
    renderCountries();
    updateMap();
    setDirty(false);
    loaded = true;
  }

  const geographyReady = loadGeography();
  // Attach a handler immediately so a network failure cannot become an unhandled rejection.
  geographyReady.catch(() => message('The country map could not load. Please reload the page and try again.', 'error'));

  for (const tab of ['signup', 'signin']) {
    $('#' + tab + '-tab').addEventListener('click', () => chooseTab(tab));
    $('#' + tab + '-tab').addEventListener('keydown', event => {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        chooseTab(event.key === 'Home' ? 'signup' : event.key === 'End' ? 'signin' : activeTab === 'signup' ? 'signin' : 'signup', true);
      }
    });
  }
  document.querySelectorAll('[data-password]').forEach(button => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.password);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    input.dataset.passwordVisible = String(show);
    button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  }));

  $('#signup-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const nickname = $('#signup-nickname').value.trim();
    if (!nicknamePattern.test(nickname)) { message('Choose a nickname with 3–24 letters, numbers or underscores.', 'error'); return; }
    const email = $('#signup-email').value.trim();
    const password = $('#signup-password').value;
    if(!window.TRAVEL_PROFILE_EDITOR.validPassword(password)){message('Use at least 8 characters, including a letter, a number and a symbol.','error');return;}
    busy(form, async () => {
      message('Creating your account…');
      const { data, error } = await client.auth.signUp({ email, password, options: { data: { nickname }, emailRedirectTo: redirectUrl() } });
      if (error) throw error;
      if (data.session) {
        confirmationEmail = '';
        $('#confirmation-actions').hidden = true;
        await displaySession(data.session, true);
      } else {
        confirmationEmail = email;
        $('#confirmation-actions').hidden = false;
        $('#signin-email').value = email;
        message('Check your email for a confirmation link. After confirming, sign in to build your map. If you already have an account, use Sign in.', 'success');
      }
    });
  });

  $('#signin-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = $('#signin-email').value.trim();
    const password = $('#signin-password').value;
    busy(form, async () => {
      message('Signing in…');
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      confirmationEmail = '';
      $('#confirmation-actions').hidden = true;
      await displaySession(data.session, true);
    });
  });

  $('#resend-confirmation').addEventListener('click', async event => {
    if (!confirmationEmail) return;
    event.currentTarget.disabled = true;
    try {
      const { error } = await client.auth.resend({ type: 'signup', email: confirmationEmail, options: { emailRedirectTo: redirectUrl() } });
      if (error) throw error;
      message('A confirmation email has been requested. Check your inbox and spam folder.', 'success');
    } catch (error) { message(friendlyError(error), 'error'); }
    finally { $('#resend-confirmation').disabled = false; }
  });

  $('#forgot-password').addEventListener('click', async event => {
    const input = $('#signin-email');
    if (!input.value.trim() || !input.checkValidity()) { input.reportValidity(); input.focus(); return; }
    event.currentTarget.disabled = true;
    try {
      const { error } = await client.auth.resetPasswordForEmail(input.value.trim(), { redirectTo: redirectUrl(true) });
      if (error) throw error;
      message('If an account exists for this email, you’ll receive a password-reset link. Check your inbox.', 'success');
    } catch (error) { message(friendlyError(error), 'error'); }
    finally { $('#forgot-password').disabled = false; }
  });

  $('#recovery-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const password = $('#recovery-password').value;
    if(!window.TRAVEL_PROFILE_EDITOR.validPassword(password)){message('Use at least 8 characters, including a letter, a number and a symbol.','error');return;}
    busy(form, async () => {
      const { error } = await client.auth.updateUser({ password });
      if (error) throw error;
      recoveryMode = false;
      const cleanUrl = new URL(location.href);
      cleanUrl.searchParams.delete('reset');
      cleanUrl.hash = '';
      history.replaceState(null, '', cleanUrl.pathname + cleanUrl.search);
      const { data } = await client.auth.getSession();
      await displaySession(data.session, true);
      message('Your password has been updated.', 'success');
    });
  });

  $('#profile-form').addEventListener('submit', event => {
    window.TRAVEL_SCRATCH?.prepareAudio?.();
    event.preventDefault();
    if (!user || !storageReady || savingCountries) return;
    const nickname = profile?.nickname || user.user_metadata?.nickname || '';
    if (!nicknamePattern.test(nickname)) { message('Choose a nickname with 3–24 letters, numbers or underscores.', 'error'); return; }
    const id = user.id;
    const previouslySaved = new Set(profile?.visited_countries || []);
    const visited = [...new Set([...selected].filter(code => allowedCodes.has(code)).concat([...legacySelected]))].sort();
    const snapshot = JSON.stringify({ nickname, visited });
    const button = $('#save-profile');
    button.disabled = true;
    savingCountries=true;updateMapAddButton();
    $('#save-state').textContent = 'Saving…';
    (async () => {
      try {
        const { data, error } = await client.from('travel_builder_profiles').upsert({ id, nickname, visited_countries: visited }, { onConflict: 'id' }).select('id,nickname,visited_countries,updated_at').single();
        if (error) throw error;
        if (user?.id !== id) return;
        const newlyVisited = visited.filter(code => allowedCodes.has(code) && !previouslySaved.has(code));
        celebrationPending = new Set(newlyVisited);
        profile = data;
        updateMap();
        if (newlyVisited.length && window.TRAVEL_SCRATCH) {
          try { await window.TRAVEL_SCRATCH.celebrate(newlyVisited, code => {
            celebrationPending.delete(code);
            updateMap();
          }); } catch { /* The account save already succeeded; an effect must never undo it. */ }
        }
        celebrationPending.clear();
        updateMap();
        if (user?.id !== id) return;
        $('#traveller-title').textContent = nickname + '’s Atlas';
        const current = JSON.stringify({ nickname: profile?.nickname || user.user_metadata?.nickname || '', visited: [...new Set([...selected,...legacySelected])].sort() });
        setDirty(current !== snapshot);
        message('');
      } catch (error) {
        if (user?.id === id) { setDirty(true); message(friendlyError(error), 'error'); }
      } finally { savingCountries=false;updateMapAddButton();if (user?.id === id) button.disabled = !storageReady; }
    })();
  });

  $('#map-add-country')?.addEventListener('click',()=>{
    if(!mapCountryCode||savingCountries||!user||!storageReady)return;
    setCountrySelection(mapCountryCode,true);
    $('#profile-form').requestSubmit();
  });

  $('#country-search').addEventListener('input', renderCountries);
  $('#selected-only').addEventListener('change', renderCountries);
  $('#include-territories').addEventListener('change',()=>{renderCountries();updateMap();});
  $('#unselect-all').addEventListener('change', event => {
    if (!event.target.checked) return;
    selected.clear();
    setDirty(true);
    renderCountries();
    updateMap();
  });
  $('#signout-button').addEventListener('click', async event => {
    event.currentTarget.disabled = true;
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      confirmationEmail = '';
      await displaySession(null, true);
      message('You’re signed out. Your saved profile will be here when you return.', 'success');
    } catch (error) { message(friendlyError(error), 'error'); }
    finally { $('#signout-button').disabled = false; }
  });

  (async () => {
    try {
      if (!window.supabase?.createClient || !config?.url || !config?.publishableKey) throw new Error('Account connection unavailable');
      client = window.supabase.createClient(config.url, config.publishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'travel-builder-auth' }
      });
      window.TRAVEL_EASY_CLIENT = client;
      window.TRAVEL_PROFILE_EDITOR?.init(client,()=>({user,profile}),data=>{
        profile=data;$('#traveller-title').textContent=data.nickname+'’s Atlas';
      });
      client.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') recoveryMode = true;
        // Do not await another auth operation inside the SDK's callback.
        setTimeout(() => displaySession(session).catch(error => message(friendlyError(error), 'error')), 0);
      });
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      await displaySession(data.session);
      const callbackError = new URLSearchParams(location.hash.slice(1)).get('error_description');
      if (callbackError) {
        message('This email link could not be used. It may have expired. Sign in or request another link.', 'error');
        history.replaceState(null, '', location.pathname);
      }
    } catch (error) {
      message('Account access could not load. Please reload this page. If the problem continues, contact the site owner.', 'error');
    }
  })();
})();
