import React, { useState } from 'react';

function ShoppingListForm(props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.random(Math.floor() * 1000),
      text: input,
    });

    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // First we check to see if "edit" prop exists. If not, we render the normal form
  // If the prop "edit" exists, we know to render the update form instead
  return !props.edit ? (
    <div>
      <form className="list-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add an item to your shopping list"
          value={input}
          name="text"
          className="list-input"
          onChange={handleChange}
        ></input>
        <button className="list-button">Add item</button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Update entry: {props.edit.value}</h3>
      <form className="list-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={props.edit.value}
          value={input}
          name="text"
          className="list-input"
          onChange={handleChange}
        ></input>
        <button className="list-button">Update</button>
      </form>
    </div>
  );
}

export default ShoppingListForm;