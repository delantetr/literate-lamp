const db = require('../config/connection');
const { Recipe, User } = require('../models');

const recipeData = require('./recipeData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Recipe.deleteMany({});

  // Insert user data and get inserted users
  const users = await User.insertMany(userData);

  // Loop through recipeData and associate recipes with users
  for (const recipeSeed of recipeData) {
    const { username, ...recipeWithoutUser } = recipeSeed;
    const user = users.find(userSeed => userSeed.username === username);

    // Create a new recipe with the associated user reference
    const newRecipe = new Recipe({
      ...recipeWithoutUser,
      user: user._id // Use the user's ObjectId here
    });

    // Save the new recipe to the database
    await newRecipe.save();
  }

  console.log('All done!');
  process.exit(0);
});
