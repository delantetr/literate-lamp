import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';

const AddToShoppingList = ({ recipeId }) => {
  const [ingredients, setIngredients] = useState('');

  const [addIngredients, { error }] = useMutation(ADD_RECIPE);

  const handleButtonClick = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addIngredients({
        variables: { recipeId, ingredients },
      });

      setIngredients('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Want to make this recipe? Add it to your shopping list!</h4>
        <div className="col-12 col-lg-3">
          <button className="btn btn-info btn-block py-3" type="submit" onSubmit={handleButtonClick}>
            Add
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
    </div>
  );
};

export default AddToShoppingList;