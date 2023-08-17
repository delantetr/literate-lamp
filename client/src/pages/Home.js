import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_SINGLE_RECIPE, QUERY_RANDOM_RECIPE_ID } from '../utils/queries';
import AddToShoppingList from '../components/AddToShoppingList';
import Auth from '../utils/auth';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const { loading: randomIdLoading, data: randomIdData } = useQuery(QUERY_RANDOM_RECIPE_ID);

  const randomRecipeId = randomIdData?.randomRecipeId;

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    variables: { recipeId: randomRecipeId },
  });

  const featuredRecipe = data?.recipe || {};

  if (randomIdLoading || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='d-flex justify-content-center'>
      <h1 className='h1'>Welcome to Prepal!</h1>
      </div>
      <div className='text-center'>
        <h2>Featured Recipe</h2>
      </div>
      <Card>
        <Card.Body>
      <div>
        {featuredRecipe.image ? (
          <img src={featuredRecipe.image} alt={featuredRecipe.name} style={{ width: '200px', height: '150px' }} />
        ) : (
          <Card.Img src="/placeholder-image.jpg" alt="Placeholder" />
        )}
        <h1 className="card-header">{featuredRecipe.name}</h1>
      </div>
      <Card.Text>
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {featuredRecipe.ingredients && featuredRecipe.ingredients.length > 0 ? (
            featuredRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>No ingredients available</li>
          )}
        </ul> 
      </div>

      <div>
        <h2>Method:</h2>
        <ul>
          {featuredRecipe.method && featuredRecipe.method.length > 0 ? (
            featuredRecipe.method.map((method, index) => (
              <li key={index}>{method}</li>
            ))
          ) : (
            <li>No method available</li>
          )}
        </ul>
      </div>
      </Card.Text>
      </Card.Body>
      </Card>

      {Auth.loggedIn() ? (
        <Card className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <AddToShoppingList featuredRecipeId={featuredRecipe._id} />
        </Card>
      ) : (
        <p>
          <h4>Need the ingredients for this recipe?</h4>
          You need an account to add these ingredients to your shopping list. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}   

    </div>

  );
};

export default Home;
