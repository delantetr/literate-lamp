const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedRecipes: [Recipe]
  shoppingList: [List]
  recipeCount: Int
}

type Recipe {
  _id: ID!
  name: String!
  description: String
  method: String!
  ingredients: [String!]!
  cuisine: String!
  image: String
  author: [User]
}

type List {
  _id: ID!
  items: [String!]!
}

type Auth {
  token: ID!
  user: User
}

  type Query {
    users: [User]
    user(id: ID!): User
    recipes: [Recipe]
    recipe(id: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(name: String!, ingredients: [String!], cuisine: String!, method: String!): Recipe
    saveRecipeToUser(userId: ID!, recipeId: ID!): User
    addToShoppingList(userId: ID!, items: [String!]!): User
    
  }
`;

module.exports = typeDefs;
