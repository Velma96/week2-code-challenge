document.addEventListener("DOMContentLoaded", () => {
  // Initialize the shopping list array
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  // Select elements
  const addButton = document.getElementById("add-button");
  const clearButton = document.getElementById("clear-button");
  const itemInput = document.getElementById("item-input");
  const listContainer = document.getElementById("list-container");

  // Function to save the list to localStorage
  const saveList = () => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  // Function to render the shopping list
  const renderList = () => {
    listContainer.innerHTML = ""; // Clear current list in DOM
    shoppingList.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.className = item.purchased ? "purchased" : "";
      listItem.textContent = item.name;

      // Add "Mark as Purchased" button
      const purchaseButton = document.createElement("button");
      purchaseButton.textContent = item.purchased ? "Unmark" : "Mark Purchased";
      purchaseButton.className = "purchase-btn";
      purchaseButton.addEventListener("click", () => {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        saveList();
        renderList();
      });

      // Add "Edit" button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit-btn";
      editButton.addEventListener("click", () => {
        const newName = prompt("Edit item name:", item.name);
        if (newName !== null && newName.trim() !== "") {
          shoppingList[index].name = newName.trim();
          saveList();
          renderList();
        }
      });

      // Add "Remove" button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-btn";
      removeButton.addEventListener("click", () => {
        shoppingList.splice(index, 1);
        saveList();
        renderList();
      });

      // Append buttons and list item to the DOM
      listItem.appendChild(purchaseButton);
      listItem.appendChild(editButton);
      listItem.appendChild(removeButton);
      listContainer.appendChild(listItem);
    });
  };

  // Add event listener to "Add" button
  addButton.addEventListener("click", () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
      shoppingList.push({ name: itemName, purchased: false });
      saveList();
      renderList();
      itemInput.value = ""; // Clear the input field
    } else {
      alert("Please enter an item before adding.");
    }
  });

  // Add event listener to "Clear List" button
  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the entire list?")) {
      shoppingList = [];
      saveList();
      renderList();
    }
  });

  // Render the list on page load
  renderList();
});
