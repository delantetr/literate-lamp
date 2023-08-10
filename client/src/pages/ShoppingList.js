import React, { useState } from 'react';
import ShoppingListForm from './ShoppingListForm';
import ShoppingList from './ShoppingList';

function ShoppingList() {
  const [list, setList] = useState([]);

  // Function to add a shopping list item
  const addListItem = (item) => {
    console.log(
      item
    );
    // Check to see if the item text is empty
    if (!item.text) {
      return;
    }

    // Add the new shopping list item to the existing array of objects
    const newList = [item, ...list];
    console.log(newList);

    // Call setList to update state with our new set of shopping list items
    setList(newList);
  };

  // Function to remove shopping list item and update state
  const removeListItem = (id) => {
    const updatedList = [...list].filter((item) => item.id !== id);

    setList(updatedList);
  };

  // Function to edit the shopping list item
  const editListItem = (itemId, newValue) => {
    // Make sure that the value isn't empty
    if (!newValue.text) {
      return;
    }

    // We use the "prev" argument provided with the useState hook to map through our list of items
    // We then check to see if the item ID matches the if of the item that was clicked and if so we set it to a new value
    setList((prev) =>
      prev.map((item) => (item.id === itemId ? newValue : item))
    );
  };

  return (
    <div>
      <h1>Your Shopping List</h1>
      <ShoppingListForm onSubmit={addListItem} />
      <ShoppingList
        list={list}
        removeListItem={removeListItem}
        editListItem={editListItem}
      ></ShoppingList>
    </div>
  );
}

export default ShoppingList;
