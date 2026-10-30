'use strict';
const destinationChoice = document.querySelector('#destination');
const budgetField = document.querySelector('#budget-field');
const budgetChoice = document.querySelector('#trip-budget');
function updateBudgetVisibility() {
  const hasDestination = Boolean(destinationChoice.value);
  budgetField.hidden = !hasDestination;
  budgetChoice.disabled = !hasDestination;
}
destinationChoice.addEventListener('change', updateBudgetVisibility);
window.addEventListener('pageshow', updateBudgetVisibility);
updateBudgetVisibility();
