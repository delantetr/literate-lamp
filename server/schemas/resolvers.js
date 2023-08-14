const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    users: async () => {
      try{
        const users = await User.find().populate('savedRecipes');
        return users;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    user: async (parent, { id }) => {
      try{
        const user = await User.findOne({ _id: id }).populate('savedRecipes');
        return user;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    recipes: async () => {
      try{
        const recipes = await Recipe.find().populate('user');
        return recipes;
      } catch (error) {
        throw new Error('No users found');
      }
    },
    recipe: async (parent, { id }) => {
      try {
        const recipe = await Recipe.findOne({ _id: id }).populate('user');
        return recipe;
        
      } catch (error) {
        throw new Error('No recipe found');
      }
    },    
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedRecipes');
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
      try{
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
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Login failed'); // Catch and handle any errors
      }
    },
    addRecipe: async (parent, { name, ingredients, cuisine, method }, context) => {
      if (context.user) {
        try {
          console.log('Authenticated user:', context.user); // Log the authenticated user

    
          const newRecipe = await Recipe.create({ 
            name, 
            ingredients, 
            cuisine, 
            method,
            user: context.user._id
          });
    
          console.log('New recipe created:', newRecipe); // Log the new recipe
    
          // Update the authenticated user's savedRecipes
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedRecipes: newRecipe._id } },
            { new: true }
          );
    
          return newRecipe;
        } catch (error) {
          console.error('Error adding recipe:', error);
          throw new Error('Failed to add recipe');
        }
      } else {
        throw new AuthenticationError('You need to be logged in to add a recipe!');
      }
    },
    
    
    
    
    
    
    saveRecipeToUser: async (parent, { userId, recipeId }, context) => {
      if (context.user) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: userId }, // Use _id to find the user
            { $addToSet: { savedRecipes: recipeId } }, // Add the recipeId to savedRecipes
            { new: true } // Return the updated user
          );
          return user; // Return the updated user
        } catch (error) {
          throw new Error('Failed to save recipe to user');
        }
      }
      throw new AuthenticationError('You need to be logged in to save a recipe to your profile!');
    },
    addToShoppingList: async (_, { userId, items }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            { $push: { 'shoppingList': { items } } }, // Add new items to shoppingList
            { new: true } // Return the updated user
          );

          if (!updatedUser) {
            throw new Error('User not found');
          }

          return updatedUser; // Return the updated user
        } catch (error) {
          throw new Error('Failed to add to shopping list');
        }
      }
      throw new AuthenticationError('You need to be logged in to add items to the shopping list!');
    },
  },

};

module.exports = resolvers;