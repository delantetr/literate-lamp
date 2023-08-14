import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      password
      savedRecipes
      shoppingList
      recipeCount
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query singleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      name
      description
      method
      ingredients
      cuisine
      image
    }
  }
`;

export const QUERY_RECIPES = gql`
  query allRecipes {
    recipes {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      shoppingList
    }
  }
`;