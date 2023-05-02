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

    users: async () => {
      return User.find({}).select("-__v").populate("friends");
    },
    user: async (parent, { nickname }) => {
      return User.find({ nickname }).select("-__v").populate("friends");
    },

    groups: async () => {
      return Group.find();
    },
    group: async (parent, { groupId, groupname }) => {
      return Group.findOne({ _id: groupId, groupname: groupname });
    },
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
    addFriends: async (parent, { userId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: "64504e6ed7222bd3c786431b" },
        { $addToSet: { friends: "645070736f418277e3d80f96" } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },

    addGroup: async (parent, { groupname, admin }, context) => {
      const group = await Group.create({
        groupname,
        admin: "64504e6ed7222bd3c786431b",
      });
      return group;
    },

    addMembers: async (parent, { groupId, adminId }, context) => {
      const updatedGroup = await Group.findOneAndUpdate(
        { _id: "groupId" },
        { $addToSet: { members: "userId" } },
        { new: true, runValidators: true }
      );
      return updatedGroup;
    },
    // addMembers: async (parent,{userId, groupId}) => {
    //   const member = await Group.findOneAndUpdate({

    //   })
    // },
    removeGroup: async (parent, { groupId }, context) => {
      const group = await Group.findByIdAndDelete({
        _id: groupId,
      });
      return group;
    },
  },
};

module.exports = resolvers;
