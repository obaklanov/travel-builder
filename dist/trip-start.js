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
