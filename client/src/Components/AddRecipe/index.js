import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES } from '../../utils/queries';
import Form from 'react-bootstrap/Form';
import Buton from 'react-bootstrap/Button'
import Button from 'react-bootstrap/Button';


const AddRecipe = () => {
  const [recipeFormData, setRecipeFormData] = useState({
    name: '',
    ingredients: [],
    cuisine: '',
    method: [],
  });

  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      try {
        const { recipes } = cache.readQuery({ query: QUERY_RECIPES });
        cache.writeQuery({
          query: QUERY_RECIPES,
          data: { recipes: [addRecipe, ...recipes] },
        });
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeFormData({
      ...recipeFormData,
      [name]: value,
    });
  };

  const handleAddIngredient = () => {
    setRecipeFormData({
      ...recipeFormData,
      ingredients: [...recipeFormData.ingredients, ''],
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeFormData.ingredients];
    updatedIngredients[index] = value;
    setRecipeFormData({
      ...recipeFormData,
      ingredients: updatedIngredients,
    });
  };

  const handleAddStep = () => {
    setRecipeFormData({
      ...recipeFormData,
      method: [...recipeFormData.method, ''],
    });
  };

  const handleStepChange = (index, value) => {
    const updatedMethod = [...recipeFormData.method];
    updatedMethod[index] = value;
    setRecipeFormData({
      ...recipeFormData,
      method: updatedMethod,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addRecipe({
        variables: { ...recipeFormData },
      });

      setRecipeFormData({
        name: '',
        ingredients: [],
        cuisine: '',
        method: [],
      });
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <Form>
      <h2>Add a New Recipe</h2>
      <Form.Group onSubmit={handleSubmit}>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          value={recipeFormData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="cuisine">Cuisine</label>
        <Form.Control
          type="text"
          id="cuisine"
          name="cuisine"
          value={recipeFormData.cuisine}
          onChange={handleInputChange}
        />

        {/* Add more input fields for other recipe details */}
        {/* For example: */}
        <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
        <Form.Control
          id="ingredients"
          name="ingredients"
          value={recipeFormData.ingredients}
          onChange={handleInputChange}
        />

        <Form.Label htmlFor="method">Method</Form.Label>
        <Form.Control
          id="method"
          name="method"
          value={recipeFormData.method}
          onChange={handleInputChange}
        />

        <Button className='m-2' type="submit">Add Recipe</Button>
      </Form.Group>
      {error && <p>Error: {error.message}</p>}
    </Form>
  );
};

export default AddRecipe;
