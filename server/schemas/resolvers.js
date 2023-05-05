const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({})
        .select("-__v")
        .populate("friends", "Group");
      return users;
    },
    user: async (parent, { nickname }) => {
      const user = await User.findOne({ nickname })
        .select("-__v")
        .populate("friends");
      return user;
    },
    me: async (parent, args, context) => {
      // checking if user is log in, if not throw error
      if (!context.user) throw new AuthenticationError("Please log in");
      return User.findOne({ _id: context.user._id });
    },

    groups: async () => {
      const group = await Group.find().select("-__v").populate("members");
      return group;
    },
    group: async (parent, { groupId }) => {
      // if ()
      return Group.findById({ _id: groupId })
        .select("-__v")
        .populate("members");
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

    // // email no friend id
    // addFriends: async (_, { userId, friendId }, context) => {
    //   const updatedUser = await User.findOneAndUpdate(
    //     // hard code atm = context.user._id
    //     { _id: "64531810fa6c63d023ae2881" },
    //     //  friends: userId // userId we want to add to our frienlist.
    //     { $addToSet: { friends: friendId } },
    //     { new: true, runValidators: true }
    //   );
    //   return updatedUser;
    // },

    addGroup: async (parent, { groupname }, context) => {
      // if (context.user) {
      const newGroup = await Group.create({
        groupname,
        // admin: context.user._id,
        admin: "6454963d3f1bb4b521fa8905",
      });
      await User.findOneAndUpdate(
        // { _id: context.user_id },
        { _id: "6454963d3f1bb4b521fa8905" },
        {
          $addToSet: {
            groupsadministrated: newGroup._id,
            groups: newGroup._id,
          },
        },
        { new: true, runValidators: true }
      );
      return newGroup;
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addMembers: async (_, { userId, memberId }, context) => {
      // if (context.user = group.admin) {
      const showMembers = await Group.findOne(
        // { _id: context.group._id}
        {
          _id: context.group._id,
        },
        // { $addToSet: { members: userId } },
        {
          $addToSet: {
            members: { memberId: userId },
          },
        },
        { new: true, runValidators: true }
      );
      return updatedGroup;
      // }
    },

    // addExpense: async (
    //   parent,
    //   { description, amount, payer, date, attachment }
    // ) => {
    //   const addExpenseUpdated = await Group.findOneAndUpdate(
    //     { _id: "groupId" },
    //     {
    //       $addToSet: {
    //         expenses: description,
    //         amount,
    //         groupId,
    //         payer,
    //         date,
    //         attachment,
    //       },
    //     },
    //     { new: true, runValidators: true }
    //   );
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
