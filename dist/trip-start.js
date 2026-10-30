'use strict';
const destinationChoice = document.querySelector('#destination');
const destinationField = document.querySelector('#destination-field');
const budgetChoice = document.querySelector('#trip-budget');
function updateDestinationVisibility() {
  const amount = budgetChoice.value.replace(/[$,\s]/g, '');
  const valid = /^\d+(?:\.\d{1,2})?$/.test(amount) && Number(amount) > 0;
  budgetChoice.setCustomValidity(budgetChoice.value && !valid ? 'Enter a positive CAD amount, such as $5,000 or 4250.' : '');
  destinationField.hidden = !valid;
  destinationChoice.disabled = !valid;
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
