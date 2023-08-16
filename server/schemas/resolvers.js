const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { User, Recipe } = require('../models');
const { signToken } = require('../utils/auth');
const { createWriteStream } = require('fs');
const bcrypt = require('bcrypt');

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
      console.log('Login Attempt:', email);
      try{
        const user = await User.findOne({ email });
        console.log('User from Database:', user);
        console.log('User password:', user.password);

        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }

        let correctPw = false;

        if (user.password.startsWith('$2a$')) {
          correctPw = await bcrypt.compare(password, user.password);
        } else {
          correctPw = password === user.password;
        }

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
    addRecipe: async (parent, { name, ingredients, cuisine, method, image }, context) => {
      if (context.user) {
        try {
          console.log('Entering addRecipe resolver');
          console.log('Recipe Input:', name, ingredients, cuisine, method, image);
  
          // Check if an image is provided
          if (image) {
            console.log('Image is provided:', image);
  
            const { createReadStream, filename } = await image;
            console.log('Creating read stream for image:', filename);
  
            const stream = createReadStream();
            const path = `public/uploads/${filename}`;
  
            await new Promise((resolve, reject) => {
              stream
                .pipe(createWriteStream(path))
                .on('finish', resolve)
                .on('error', reject);
            });
            console.log('Stream: ', stream);
  
            const newRecipe = await Recipe.create({
              name,
              ingredients,
              cuisine,
              method,
              image: path, // Include the image field when an image is provided
              user: context.user._id,
            });
            console.log('New Recipe: ', newRecipe);
  
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedRecipes: newRecipe._id } },
              { new: true }
            );
  
            console.log('Exiting addRecipe resolver');
            return newRecipe;
          } else {
            console.log('Image is not provided');
  
            // Create the recipe without the image field
            const newRecipe = await Recipe.create({
              name,
              ingredients,
              cuisine,
              method,
              user: context.user._id,
            });
  
            console.log('New Recipe: ', newRecipe);
  
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedRecipes: newRecipe._id } },
              { new: true }
            );
  
            console.log('Exiting addRecipe resolver');
            return newRecipe;
          }
        } catch (error) {
          console.error('Error adding recipe:', error);
          return new ApolloError('Failed to add recipe', 'RECIPE_ADD_ERROR');
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