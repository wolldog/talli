const { AuthenticationError } = require("apollo-server-express");
const { User, Group, Expense } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // checking if user is log in, if not throw error
      if (!context.user) throw new AuthenticationError("Please log in");
      return User.findOne({ _id: context.user._id });
    },

    users: async () => {
      const users = await User.find({}).select("-__v").populate("friends");
      return users;
    },
    user: async (parent, { nickname }) => {
      const user = await User.findOne({ nickname })
        .select("-__v")
        .populate("friends");
      return user;
    },

    groups: async () => {
      return Group.find().select("-__v").populate("expenses", "members");
    },
    group: async (parent, { groupId }) => {
      return Group.findOne({ _id: groupId })
        .select("-__v")
        .populate("expenses", "members");
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
    // email no friend id
    addFriends: async (_, { userId, friendId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        // hard code atm = context.user._id
        { _id: "64531810fa6c63d023ae2881" },
        //  friends: userId // userId we want to add to our frienlist.
        { $addToSet: { friends: friendId } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },

    addGroup: async (parent, { groupname, admin }, context) => {
      if (context.user) {
        const group = await Group.create({
          groupname,
          // hardcode atm// admin = context.user._id.
          admin: context.user._id,
        });
        return group;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addMembers: async (parent, { userId, memberId }, context) => {
      const updatedGroup = await Group.findOneAndUpdate(
        // { _id: context.group._id}
        {
          _id: "6452d502ef92e602c0084a90",
        },
        // { $addToSet: { members: userId } },
        { $addToSet: { members: "645070736f418277e3d80f96" } },
        { new: true, runValidators: true }
      );
      return updatedGroup;
    },

    addExpense: async (
      parent,
      { description, amount, payer, date, attachment }
    ) => {
      const addExpenseUpdated = await Group.findOneAndUpdate(
        { _id: "groupId" },
        {
          $addToSet: {
            expenses: description,
            amount,
            groupId,
            payer,
            date,
            attachment,
          },
        },
        { new: true, runValidators: true }
      );
    },

    removeGroup: async (parent, { groupId }, context) => {
      const group = await Group.findByIdAndDelete({
        _id: groupId,
      });
      return group;
    },
  },
};

module.exports = resolvers;
