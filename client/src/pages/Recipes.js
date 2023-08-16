import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { QUERY_RECIPES } from '../utils/queries';

const Recipes = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  console.log(data);


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
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>{recipe.description}</Card.Text>
            {/* Add more details or buttons here */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Recipes;
