import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TO_SHOPPING_LIST } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function ShoppingListForm() {
    const [formState, setFormState] = useState({
      userId: '',
      items: '',
    });
  
    const [addToShoppingList, { error }] = useMutation(ADD_TO_SHOPPING_LIST, {
      update(cache, { data: { addToShoppingList } }) {
        try {
          const { me } = cache.readQuery({ query: QUERY_ME });
  
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: [addToShoppingList, ...me] },
          });
        } catch (e) {
          console.error(e);
        }
      },
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(event);
      try {
        const { data } = await addToShoppingList({
          variables: { ...formState },
        });
  
        setFormState({
          userId: '',
          items: '',
        });
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'text') {
        setFormState({ ...formState, [name]: value });
      } else if (name !== 'text') {
        setFormState({ ...formState, [name]: value });
      }
    };

  return (
    <div>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleSubmit}
      >
        <div className="col-12">
          <textarea
            name="text"
            placeholder=""
            value={formState.shoppingList}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit">
            Add Item
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default ShoppingListForm;
