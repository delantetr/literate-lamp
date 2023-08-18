import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import { QUERY_RECIPES } from '../utils/queries';
import AddRecipe from '../Components/AddRecipe';

const Recipes = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  
  const recipes = data?.recipes || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <main>
      <div className="card-columns">
        {recipes.map((recipe) => (
          <Card className="m-4" key={recipe._id}>
            <Card.Img variant="top" src={recipe.image} alt={recipe.name} style={{ width: '200px', height: '150px' }}/>
            <Card.Body>
              {/* Create a link to the single recipe page */}
              <Link to={`/recipe/${recipe._id}`}>
                <Card.Title>{recipe.name}</Card.Title>
              </Link>
              <Card.Text>{recipe.description}</Card.Text>
              {/* Add more details or buttons here */}
            </Card.Body>
          </Card>
        ))}
      </div>
      {Auth.loggedIn() ? (
        <Card className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
            <AddRecipe />
        </Card>
      ) : (
        <p>
          <h4>Want to add a recipe?</h4>
          You need an account to add a new recipe. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}   
    </main>
    
  );
};

export default Recipes;
