const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    users: async () => {
      try{
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    user: async (parent, { id }) => {
      try{
        const user = await User.findOne({ _id: id });
        return user;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    recipes: async () => {
      try{
        const recipes = await Recipe.find();
        return recipes;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    recipe: async (parent, { id }) => {
      try{
        const recipe = await Recipe.findOne({ _id: id });
        return recipe;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },



  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const newUser = await User.create({ username, email, password });
        const token = signToken(newUser);
        return { token, newUser };
      } catch (error) {
        console.error('User creation error:', error.message);
        throw new Error('Failed to create user');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addRecipe: async (parent, { name, ingredients, cuisine, method }, context) => {
      if (context.user) {
        try {
        const newRecipe = await Recipe.create({ 
          name, 
          ingredients, 
          cuisine, 
          method 
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedRecipes: newRecipe._id } }
        )
        return newRecipe;
      } catch (error) {
        throw new Error('Failed to add recipe');
      }
    }
      throw new AuthenticationError('You need to be logged in to add a recipe!');
    },
    saveRecipeToUser: async (parent, { userId, recipeId }, context) => {
      if (context.user) {
        const savedRecipe = await User.findOne({ 
          userId, 
          recipeId });
        return { savedRecipe };
      } 
        throw new AuthenticationError('Failed to create user');
    },
    addToShoppingList: async (_, { userId, items }, context) => {
      if (context.user) {
        try {
          const item = await User.findOne({ 
            userId, 
            items 
          });
          return { newItem };
        } catch (error) {
          throw new Error('Failed to add to shopping list');
        }
      }
      throw new AuthenticationError('You need to be logged in to add items to the shopping list!');
    },
  },
};

module.exports = resolvers;