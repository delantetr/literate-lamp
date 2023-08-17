import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Card from 'react-bootstrap/Card';

import AddToShoppingList from '../components/AddToShoppingList';


import { QUERY_SINGLE_RECIPE } from '../utils/queries';

const Recipe = () => {
  // Use `useParams()` to retrieve value of the route parameter `:recipeId`
  const { recipeId } = useParams();
  console.log('Recipe ID:', recipeId);

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    // pass URL parameter
    variables: { recipeId: recipeId },
  });
  console.log('Recipe Data:', data);

  const recipe = data?.recipe || {};
  console.log('Recipe:', recipe);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <Card className='m-4'>
    <div>
        
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.name} style={{ width: '200px', height: '150px' }}/>
        ) : (
          <img src="/placeholder-image.jpg" alt="Placeholder" />
        )}
      <h1 className="card-header">{recipe.name}</h1>
    </div>

    <div>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>

    <div> 
        <h2>Method:</h2>
        <ul>
        {recipe.method.map((method, index) => (
          <li key={index}>{method}</li>
        ))}
        </ul>
      </div>
      </Card>
      {Auth.loggedIn() ? (
        <Card className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <AddToShoppingList recipeId={recipe._id} />
        </Card>
      ) : (
        <p>
          <h4>Need the ingredients for this recipe?</h4>
          You need an account to add these ingredients to your shopping list. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}   

    </main>
  );
};

export default Recipe;
