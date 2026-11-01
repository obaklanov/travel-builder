'use strict';
const destinationChoice = document.querySelector('#destination');
const destinationField = document.querySelector('#destination-field');
const budgetChoice = document.querySelector('#trip-budget');
function updateDestinationVisibility() {
  const amount = budgetChoice.value.replace(/[$,\s]/g, '');
  const valid = /^\d+(?:\.\d{1,2})?$/.test(amount) && Number(amount) > 0;
  budgetChoice.setCustomValidity(budgetChoice.value && !valid ? 'Enter a positive CAD amount, such as $5,000 or 4250.' : '');
  destinationField.hidden = false;
  destinationChoice.disabled = false;
}
budgetChoice.addEventListener('input', updateDestinationVisibility);
budgetChoice.addEventListener('change', updateDestinationVisibility);
window.addEventListener('pageshow', updateDestinationVisibility);
updateDestinationVisibility();

// Use our own light suggestion panel instead of the browser's native popup.
const budgetWrapper = document.createElement('div');
budgetWrapper.className = 'budget-combobox';
budgetChoice.before(budgetWrapper);
budgetWrapper.append(budgetChoice);
const budgetToggle = document.createElement('button');
budgetToggle.type = 'button';
budgetToggle.className = 'budget-toggle';
budgetToggle.setAttribute('aria-label', 'Show suggested budgets');
budgetToggle.textContent = '⌄';
const budgetSuggestions = document.createElement('div');
budgetSuggestions.id = 'budget-suggestions';
budgetSuggestions.setAttribute('role', 'group');
budgetSuggestions.setAttribute('aria-label', 'Suggested budgets in CAD');
budgetSuggestions.hidden = true;
budgetWrapper.append(budgetToggle, budgetSuggestions);
budgetChoice.setAttribute('aria-controls', budgetSuggestions.id);
budgetToggle.setAttribute('aria-controls', budgetSuggestions.id);
const budgetPresets = [...document.querySelectorAll('#budget-options option')].map(option => option.value);
function closeBudgetSuggestions() {
  budgetSuggestions.hidden = true;
  budgetChoice.setAttribute('aria-expanded', 'false');
  budgetToggle.setAttribute('aria-expanded', 'false');
}
function showBudgetSuggestions(filter = '') {
  budgetSuggestions.replaceChildren();
  const digits = filter.replace(/[$,\s]/g, '');
  for (const amount of budgetPresets.filter(value => !digits || value.replace(/[$,\s]/g, '').startsWith(digits))) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'budget-suggestion'; button.textContent = amount;
    button.addEventListener('click', () => {
      budgetChoice.value = amount; updateDestinationVisibility(); closeBudgetSuggestions(); budgetChoice.focus(); closeBudgetSuggestions();
    });
    budgetSuggestions.append(button);
  }
  budgetSuggestions.hidden = !budgetSuggestions.childElementCount;
  budgetChoice.setAttribute('aria-expanded', String(!budgetSuggestions.hidden));
  budgetToggle.setAttribute('aria-expanded', String(!budgetSuggestions.hidden));
}
budgetToggle.addEventListener('click', () => {
  if (budgetSuggestions.hidden) showBudgetSuggestions(); else closeBudgetSuggestions();
});
budgetChoice.addEventListener('click', () => showBudgetSuggestions());
budgetChoice.addEventListener('input', () => showBudgetSuggestions(budgetChoice.value));
budgetChoice.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') { event.preventDefault(); if (budgetSuggestions.hidden) showBudgetSuggestions(); budgetSuggestions.querySelector('button')?.focus(); }
});
budgetWrapper.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); closeBudgetSuggestions(); budgetChoice.focus(); }
});
budgetSuggestions.addEventListener('keydown', event => {
  if (!['ArrowDown','ArrowUp'].includes(event.key)) return;
  event.preventDefault();
  const buttons = [...budgetSuggestions.querySelectorAll('button')];
  const index = buttons.indexOf(document.activeElement);
  buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length]?.focus();
});
document.addEventListener('click', event => { if (!budgetWrapper.contains(event.target)) closeBudgetSuggestions(); });
budgetWrapper.addEventListener('focusout', event => { if (!budgetWrapper.contains(event.relatedTarget)) closeBudgetSuggestions(); });

// Generate editable trip ideas without requiring filters or an account.
let previousDestination = null;
const tripIdea = document.querySelector('#trip-idea');
document.querySelector('#destination-search').addEventListener('submit', event => {
  event.preventDefault(); closeBudgetSuggestions();
  const amount = budgetChoice.value.replace(/[$,\s]/g, '');
  const validBudget = /^\d+(?:\.\d{1,2})?$/.test(amount) && Number(amount) > 0;
  const origin = document.querySelector('#location-label')?.textContent || '';
  const knownOrigin = origin && !['Finding your city…','Set your city'].includes(origin);
  let options = [...destinationChoice.options].filter(option => option.value);
  if (!destinationChoice.value) {
    const abroad = options.filter(option => !knownOrigin || !origin.toLowerCase().endsWith(', ' + option.textContent.toLowerCase()));
    if (abroad.length) options = abroad;
    const different = options.filter(option => option.value !== previousDestination);
    if (different.length) options = different;
  }
  const destination = destinationChoice.value ? [...destinationChoice.options].find(option => option.value === destinationChoice.value) : options[Math.floor(Math.random() * options.length)];
  previousDestination = destination.value;
  const days = [7,10,14,21][Math.floor(Math.random() * 4)];
  const start = new Date(); start.setHours(12,0,0,0); start.setDate(start.getDate() + 14 + Math.floor(Math.random() * 77));
  const end = new Date(start); end.setDate(end.getDate() + days - 1);
  const formatter = new Intl.DateTimeFormat('en-CA', {month:'short',day:'numeric',year:'numeric'});
  document.querySelector('#trip-idea-title').textContent = destination.textContent;
  document.querySelector('#trip-origin').textContent = knownOrigin ? 'From ' + origin : 'Departure city: choose your city above';
  const locationLabel = document.querySelector('#location-label');
  const departure = departureForLocation(knownOrigin ? origin : '', locationLabel?.dataset.latitude ? Number(locationLabel.dataset.latitude) : NaN, locationLabel?.dataset.longitude ? Number(locationLabel.dataset.longitude) : NaN);
  const iso = date => date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0');
  const estimate = quickTripEstimate(destination.value,days,departure.code,iso(start),iso(end));
  const cost = new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(estimate.total);
  const datesLine = document.querySelector('#trip-dates');
  datesLine.textContent = formatter.format(start) + ' – ' + formatter.format(end) + ' · ' + days + ' days · Approx. ' + cost + ' CAD';
  datesLine.title = 'Sample per-person budget: round-trip flight, accommodation, food, local transport and miscellaneous. Excludes insurance, visas and major paid activities.';
  if (!departure.matched) document.querySelector('#trip-origin').textContent += ' · estimate via ' + departure.city;

  const budgetSummary = document.querySelector('#trip-budget-summary');
  budgetSummary.hidden = !validBudget;
  budgetSummary.textContent = validBudget ? 'Your budget: ' + new Intl.NumberFormat('en-CA', {style:'currency',currency:'CAD',maximumFractionDigits:2}).format(Number(amount)) + ' CAD' : '';
  const guide = document.querySelector('#trip-guide');
  const tripId = crypto.randomUUID();
  guide.href = 'destinations.html?country=' + encodeURIComponent(destination.value) + '&returnTo=home&origin=' + departure.code + '&days=' + days + '&start=' + iso(start) + '&end=' + iso(end) + '&tripId=' + tripId + '&from=' + encodeURIComponent(knownOrigin ? origin : departure.city) + (validBudget ? '&budget=' + encodeURIComponent(amount) + '&currency=CAD' : '');
  tripIdea.dataset.trip = JSON.stringify({id:tripId,country:destination.value,origin:departure.code,origin_label:(knownOrigin?origin:departure.city).slice(0,160),departure_date:iso(start),return_date:iso(end),days,estimated_total:estimate.total,budget:validBudget?Number(amount):null,currency:'CAD'});
  document.querySelector('#quick-add-status').textContent = '';
  document.querySelector('#quick-add-trip').textContent='Add Now';
  if(document.querySelector('#quick-add-trip').dataset.saving!=='true')document.querySelector('#quick-add-trip').disabled=false;
  tripIdea.hidden = false;
  document.querySelector('#search-message').textContent = budgetChoice.value && !validBudget ? 'Trip created without a budget. Enter a positive CAD amount to include one.' : '';
});
