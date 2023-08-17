import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
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
mutation login($email: String!, $password: String!) {
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
mutation addRecipe($name: String!, $cuisine: String!, $method: String!, $image: Upload) {
    addRecipe(name: $name, cuisine: $cuisine, method: $method, image: $image) {
      _id
      cuisine
      description
      image
      ingredients
      method
      name
      user
      serving_size
    }
  }
`;


export const SAVE_RECIPE_TO_USER = gql`
mutation saveRecipeToUser($userId: ID!, $recipeId: ID!) {
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
mutation addToShoppingList($userId: ID!, $items: [String!]!) {
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

export const UPDATE_RECIPE = gql`
mutation UpdateRecipe($updateRecipeId: ID!, $image: Upload, $name: String!, $ingredients: [String!]!, $cuisine: String!, $method: [String!]) {
  updateRecipe(id: $updateRecipeId, image: $image, name: $name, ingredients: $ingredients, cuisine: $cuisine, method: $method) {
    _id
    image
    name
    ingredients
    cuisine
    method
  }
}
`;

export const UPDATE_RECIPE_IMAGE = gql`
mutation UpdateRecipeImage($updateRecipeImageId: ID!, $image: Upload!) {
  updateRecipeImage(id: $updateRecipeImageId, image: $image) {
    _id
    image
  }
}
`;
