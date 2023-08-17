import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const Profile = () => {
  const { loading, data, error } = useQuery(QUERY_ME, {
    context: { headers: { Authorization: `Bearer ${Auth.getToken()}` }}
  });
  console.log(data);

  if (error) {
    console.error('Query Error:', error);
    return <div>Error loading profile data</div>;
  }

  const user = data?.me || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>

      <h3>Your Saved Recipes:</h3>
      <ul>
        {user.savedRecipes && user.savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>


      <p>
        <Link to="/shopping-list">View Your Shopping List</Link>
      </p>
    </div>
  );
};

export default Profile;
