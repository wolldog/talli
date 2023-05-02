const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // checking if user is log in, if not throw error
      if (!context.user) throw new AuthenticationError("Please log in");
      return User.findOne({ _id: context.user._id });
    },

    users: async (parent, args, context) => {
      return User.find({});
    },

    groups: async (parent, args, context) => {
      return Group.find({});
    },
    nicknames: async(parent )
  },
  Mutation: {
    addUser: async (parent, { nickname, email, password, phone }) => {
      const user = await User.create({ nickname, email, password, phone });
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
    addGroup: async (parent, { groupname, members, balance, expenses }) => {
      const group = await Group.create({
        groupname,
        members,
        balance,
        expenses,
      });
      // const token = signToken(user);
      return { group };
    },
    // removeGroup: async (parent, { groupId }, context) => {
    // },
  },
};

module.exports = resolvers;
