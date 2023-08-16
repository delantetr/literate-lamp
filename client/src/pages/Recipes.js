import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries';

const Recipes = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  
  const recipes = data?.recipes || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="card-columns">
      {recipes.map((recipe) => (
        <Card key={recipe._id}>
          <Card.Img variant="top" src={recipe.image} alt={recipe.name} />
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
  );
};

export default Recipes;
