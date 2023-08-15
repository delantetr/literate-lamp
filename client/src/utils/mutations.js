import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
  `;

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        recipeCount
        savedRecipes {
          _id
          name
        }
        shoppingList {
          _id
          items
        }
      }
    }
  }
`;

export const ADD_RECIPE = gql`
mutation AddRecipe($name: String!, $cuisine: String!, $method: String!) {
    addRecipe(name: $name, cuisine: $cuisine, method: $method) {
      _id
      cuisine
      description
      image
      ingredients
      method
      name
      user 
    }
  }
`;


export const SAVE_RECIPE_TO_USER = gql`
mutation SaveRecipeToUser($userId: ID!, $recipeId: ID!) {
    saveRecipeToUser(userId: $userId, recipeId: $recipeId) {
      _id
      recipeCount
      savedRecipes {
        name
        _id
      }
    }
  }
`;

export const ADD_TO_SHOPPING_LIST = gql`
mutation AddToShoppingList($userId: ID!, $items: [String!]!) {
    addToShoppingList(userId: $userId, items: $items) {
      _id
      username
      shoppingList {
        _id
        items
      }
    }
  }
`;