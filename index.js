document.addEventListener("DOMContentLoaded", () => {
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  const addButton = document.getElementById("add-button");
  const clearButton = document.getElementById("clear-button");
  const itemInput = document.getElementById("item-input");
  const listContainer = document.getElementById("list-container");

  const saveList = () => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  
  const renderList = () => {
    listContainer.innerHTML = ""; 
    shoppingList.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.className = item.purchased ? "purchased" : "";
      listItem.textContent = item.name;

      
      const purchaseButton = document.createElement("button");
      purchaseButton.textContent = item.purchased ? "Unmark" : "Mark Purchased";
      purchaseButton.className = "purchase-btn";
      purchaseButton.addEventListener("click", () => {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        saveList();
        renderList();
      });

      
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

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-btn";
      removeButton.addEventListener("click", () => {
        shoppingList.splice(index, 1);
        saveList();
        renderList();
      });

      listItem.appendChild(purchaseButton);
      listItem.appendChild(editButton);
      listItem.appendChild(removeButton);
      listContainer.appendChild(listItem);
    });
  };


  addButton.addEventListener("click", () => {
    const itemName = itemInput.value.trim();
    if (itemName) {
      shoppingList.push({ name: itemName, purchased: false });
      saveList();
      renderList();
      itemInput.value = ""; 
    } else {
      alert("Please enter an item before adding.");
    }
  });

  clearButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the entire list?")) {
      shoppingList = [];
      saveList();
      renderList();
    }
  });

  
  renderList();
});
