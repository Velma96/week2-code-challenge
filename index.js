document.addEventListener("DOMContentLoaded", () => {
  //Retrive the shopping list from local storage
  let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

  const addButton = document.getElementById("add-button");
  const clearButton = document.getElementById("clear-button");
  const itemInput = document.getElementById("item-input");
  const listContainer = document.getElementById("list-container");
 //save the shopping list to localStorage
  const saveList = () => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  //function to render the shopping list items on the page
  const renderList = () => {
    listContainer.innerHTML = ""; 
    //clear the existing list
    shoppingList.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.className = item.purchased ? "purchased" : "";
      listItem.textContent = item.name;

      //create and apppend a  "mark purchased/unmark" button
      const purchaseButton = document.createElement("button");
      purchaseButton.textContent = item.purchased ? "Unmark" : "Mark Purchased";
      purchaseButton.className = "purchase-btn";
      purchaseButton.addEventListener("click", () => {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        saveList();
        renderList();
      });
       // create and append an "edit button"
      
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
       // create and append a "remove button"
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
