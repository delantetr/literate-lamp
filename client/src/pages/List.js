import React, { useState } from 'react';
import ShoppingListForm from './ShoppingListForm';

function List(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  console.log(props.list);

  const submitUpdate = (value) => {
    props.editListItem(edit.id, value);
    setEdit({ id: null, value: '' });
  };

  if (edit.id) {
    return <ShoppingListForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.list.map((item, i) => (
      <div className="icons">
        {console.log(item)}
        <p onClick={() => setEdit({ id: item.id, value: item.text })}> ✏️</p>
        <p onClick={() => props.removeListItem(item.id)}> 🗑️</p>
      </div>
  ));
}

export default List;
