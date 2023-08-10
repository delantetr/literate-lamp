const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    users: async () => {
      
    },
  },



  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      
    },
    

  },
};

module.exports = resolvers;