'use strict';
(() => {
  const key = 'travel-easy-location';
  const toggle = document.querySelector('#location-toggle');
  const label = document.querySelector('#location-label');
  const editor = document.querySelector('#location-editor');
  const input = document.querySelector('#location-city');
  let chosen = null;
  let timer;
  let searchRevision = 0;
  let searchController;
  const cache = new Map();
  const suggestions = document.createElement('div');
  suggestions.id = 'city-suggestions';
  suggestions.setAttribute('role', 'group');
  suggestions.setAttribute('aria-label', 'Suggested cities');
  suggestions.hidden = true;
  const searchStatus = document.createElement('p');
  searchStatus.className = 'city-search-status';
  searchStatus.setAttribute('role', 'status');
  const attribution = document.createElement('a');
  attribution.className = 'city-attribution';
  attribution.href = 'https://open-meteo.com/en/docs/geocoding-api';
  attribution.target = '_blank';
  attribution.rel = 'noopener noreferrer';
  attribution.textContent = 'City search: Open-Meteo / GeoNames';
  input.autocomplete = 'off';
  input.setAttribute('aria-controls', suggestions.id);
  input.setAttribute('aria-expanded', 'false');
  input.after(suggestions, searchStatus, attribution);
  const clearSuggestions = () => {
    clearTimeout(timer); searchRevision++; searchController?.abort();
    suggestions.replaceChildren(); suggestions.hidden = true;
    input.setAttribute('aria-expanded', 'false'); searchStatus.textContent = '';
  };
  const showCities = cities => {
    suggestions.replaceChildren();
    const seen = new Set();
    const matches = cities.filter(city => city.name && city.country && city.feature_code?.startsWith('PPL'));
    for (const city of matches) {
      const title = city.name + ', ' + city.country;
      const identifier = title + (city.admin1 || '');
      if (seen.has(identifier)) continue;
      seen.add(identifier);
      const button = document.createElement('button');
      button.type = 'button';
      const name = document.createElement('span'); name.textContent = title;
      button.append(name);
      if (city.admin1) { const region = document.createElement('small'); region.textContent = city.admin1; button.append(region); }
      button.addEventListener('click', () => {
        input.value = title;
        store({city:title, manual:true, savedAt:Date.now()}); show(title); close();
      });
      suggestions.append(button);
    }
    suggestions.hidden = !suggestions.childElementCount;
    input.setAttribute('aria-expanded', String(!suggestions.hidden));
    searchStatus.textContent = suggestions.hidden ? 'No matching cities. Try a longer name, or enter your city and save.' : '';
  };
  input.addEventListener('input', () => {
    clearSuggestions();
    const query = input.value.trim();
    if (query.length < 3) return;
    const revision = searchRevision;
    timer = setTimeout(async () => {
      searchStatus.textContent = 'Finding cities…';
      try {
        if (cache.has(query.toLowerCase())) { showCities(cache.get(query.toLowerCase())); return; }
        searchController = new AbortController();
        const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(query) + '&count=10&language=en&format=json', {credentials:'omit', referrerPolicy:'no-referrer', signal:AbortSignal.any([searchController.signal, AbortSignal.timeout(6000)])});
        if (!response.ok) throw Error('Search unavailable');
        const data = await response.json();
        if (revision !== searchRevision || editor.hidden) return;
        const cities = Array.isArray(data.results) ? data.results : [];
        cache.set(query.toLowerCase(), cities); showCities(cities);
      } catch {
        if (revision === searchRevision && !editor.hidden) searchStatus.textContent = 'Suggestions unavailable. You can still enter your city and save.';
      }
    }, 250);
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' && !suggestions.hidden) { event.preventDefault(); suggestions.querySelector('button')?.focus(); }
  });
  suggestions.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const buttons = [...suggestions.querySelectorAll('button')];
    const index = buttons.indexOf(document.activeElement);
    event.preventDefault();
    if (event.key === 'ArrowUp' && index === 0) input.focus();
    else buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length]?.focus();
  });
  const show = value => { label.textContent = value || 'Set your city'; };
  const store = value => { chosen = value; try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const close = () => { clearSuggestions(); editor.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); };
  toggle.addEventListener('click', () => {
    clearSuggestions();
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
