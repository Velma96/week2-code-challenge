// Array to store shopping list items
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// DOM elements
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const listContainer = document.getElementById('list-container');

// Function to save the shopping list to local storage
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to render the shopping list
function renderList() {
  // Clear the current list
  listContainer.innerHTML = '';

  // Add each item from the array to the DOM
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.className = item.purchased ? 'purchased' : '';

    const itemText = document.createElement('span');
    itemText.textContent = item.name;
    itemText.contentEditable = true; // Make text editable
    itemText.className = 'editable';
    itemText.addEventListener('blur', () => editItem(index, itemText.textContent));

    // Mark as purchased button
    const purchaseButton = document.createElement('button');
    purchaseButton.textContent = 'Purchased';
    purchaseButton.addEventListener('click', () => togglePurchased(index));

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(index));

    listItem.appendChild(itemText);
    listItem.appendChild(purchaseButton);
    listItem.appendChild(removeButton);

    listContainer.appendChild(listItem);
  });
}

// Add a new item to the list
function addItem() {
  const newItem = inputField.value.trim();
  if (newItem) {
    shoppingList.push({ name: newItem, purchased: false });
    inputField.value = ''; // Clear input field
    saveToLocalStorage();
    renderList();
  } else {
    alert('Please enter an item.');
  }
}

// Edit an existing item
function editItem(index, newName) {
  shoppingList[index].name = newName.trim();
  saveToLocalStorage();
}

// Toggle purchased status of an item
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  saveToLocalStorage();
  renderList();
}

// Remove an item from the list
function removeItem(index) {
  shoppingList.splice(index, 1);
  saveToLocalStorage();
  renderList();
}

// Clear the shopping list
function clearList() {
  shoppingList = [];
  saveToLocalStorage();
  renderList();
}

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

// Initial render
renderList();
