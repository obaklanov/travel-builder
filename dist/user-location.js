'use strict';
(() => {
  const key = 'travel-easy-location';
  const toggle = document.querySelector('#location-toggle');
  const label = document.querySelector('#location-label');
  const editor = document.querySelector('#location-editor');
  const input = document.querySelector('#location-city');
  let chosen = null;
  const show = value => { label.textContent = value || 'Set your city'; };
  const store = value => { chosen = value; try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const close = () => { editor.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); };
  toggle.addEventListener('click', () => {
    editor.hidden = !editor.hidden;
    toggle.setAttribute('aria-expanded', String(!editor.hidden));
    if (!editor.hidden) { input.value = chosen?.city || ''; input.focus(); }
  });
  document.querySelector('#location-cancel').addEventListener('click', close);
  editor.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); close(); } });
  editor.addEventListener('submit', event => {
    event.preventDefault();
    const city = input.value.trim();
    if (!city) { input.setCustomValidity('Enter a city.'); input.reportValidity(); return; }
    store({city, manual:true, savedAt:Date.now()}); show(city); close();
  });
  input.addEventListener('input', () => input.setCustomValidity(''));
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && typeof saved.city === 'string' && saved.city.length <= 100 && (saved.manual || Date.now() - saved.savedAt < 86400000)) chosen = saved;
  } catch {}
  if (chosen) { show(chosen.city); return; }
  // Only retain the approximate city label, never the IP address or coordinates.
  fetch('https://ipapi.co/json/', {credentials:'omit', referrerPolicy:'no-referrer', signal:AbortSignal.timeout(6000)})
    .then(response => { if (!response.ok) throw Error('Location unavailable'); return response.json(); })
    .then(data => {
      if (chosen?.manual) return;
      if (data.error || typeof data.city !== 'string' || !data.city.trim()) throw Error('No city');
      const city = [data.city, data.country_name].filter(value => typeof value === 'string' && value.trim()).join(', ').slice(0,100);
      store({city, manual:false, savedAt:Date.now()}); show(city);
    }).catch(() => { if (!chosen) show(''); });
})();
