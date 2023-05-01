const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // checking if user is log in, if not throw error
      if (!context.user) throw new AuthenticationError("Please log in");
      return User.findOne({ _id: context.user._id });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password, phone }) => {
      const user = await User.create({ username, email, password, phone });
      const token = signToken(user);
      return { token, user };
    },

    loginUser: async (parent, { email, password }) => {
      //   check if user, password and credentials exists
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError("Incorrect credentials");
      const pwd = await user.isCorrectPassword(password);
      if (!pwd) throw new AuthenticationError("Incorrect password");
      const token = signToken(user);
      return { token, user };
    },
    // saveBook: async (parent, { book }, context) => {
    //   if (!context.user) throw new AuthenticationError("please log in");
    //   return await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { $addToSet: { savedBooks: book } },
    //     { new: true, runValidators: true }
    //   );
    // },

    // removeBook: async (parent, { bookId }, context) => {
    //   if (!context.user)
    //     throw new AuthenticationError("you need to be logged in");
    //   return await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { $pull: { savedBooks: { bookId: bookId } } },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;
