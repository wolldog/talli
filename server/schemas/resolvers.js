const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({})
        .select("-__v")
        .populate("friends")
        .populate({
          path: "groups",
          populate: [
            { path: "admin" },
            { path: "members" },
            { path: "transactions", populate: "payer" },
          ],
        });
      return users;
    },

    user: async (parent, { nickname }) => {
      const user = await User.findOne({ nickname })
        .select("-__v")
        .populate("friends")
        .populate({
          path: "groups",
          populate: [
            { path: "admin" },
            { path: "members" },
            { path: "transactions", populate: "payer" },
          ],
        });
      return user;
    },

    me: async (parent, args, context) => {
      // checking if user is log in, if not throw error
      if (!context.user) throw new AuthenticationError("Please log in");
      const me = await User.findOne({ _id: context.user._id })
        .select("-__v")
        .populate("friends")
        .populate({
          path: "groups",
          populate: [
            { path: "admin" },
            { path: "members" },
            { path: "transactions", populate: "payer" },
          ],
        });
      return me;
    },

    groups: async () => {
      const groups = await Group.find({})
        .select("-__v")
        .populate("members")
        .populate("admin")
        .populate("transactions")
        .populate({ path: "transactions", populate: "payer" });
      return groups;
    },

    group: async (parent, { groupId }) => {
      const group = await Group.findById({ _id: groupId })
        .select("-__v")
        .populate("members")
        .populate("admin")
        .populate("transactions")
        .populate({ path: "transactions", populate: "payer" });
      return group;
    },
  },

  Mutation: {
    addUser: async (_, { nickname, email, password, phone }) => {
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
// not implemented at at front end yet.
    addFriends: async (_, { friendId }, context) => {
      if (context.user) {
        const updatedFriends = await User.findOneAndUpdate(
          { _id: context.user._id },

          { $addToSet: { friends: friendId } },
          { new: true, runValidators: true }
        );
        await User.findByIdAndUpdate(
          { _id: friendId },
          { $addToSet: { friends: context.user._id } },
          { new: true, runValidators: true }
        );
        return updatedFriends;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addGroup: async (parent, { groupname, userId }, context) => {
      if (context.user) {
        const newGroup = await Group.create({
          groupname,
          admin: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              groups: newGroup._id,
            },
          },
          { new: true, runValidators: true }
        );
        await Group.findOneAndUpdate(
          { _id: newGroup._id },
          {
            $addToSet: {
              members: context.user._id,
            },
          },
          { new: true, runValidators: true }
        );
        return newGroup;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addMembers: async (_, { groupId, email }) => {
      try {
        // Find the user document by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with that email");
        }
        // Add the user's ObjectId to the group's members array
        const updatedGroup = await Group.findOneAndUpdate(
          { _id: groupId },
          { $addToSet: { members: user._id } },
          { new: true, runValidators: true }
        ).populate("members");
        await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { groups: groupId } },
          { new: true, runValidators: true }
        );
        return updatedGroup;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    addTransactions: async (
      _,
      {
        groupId,
        transactionname,
        description,
        amount,
        attachment,
        payer,
        date,
      },
      context
    ) => {
      // new transaction is not implemented at front end yet. Bug when user is passing amountpaid
      const amountpaid = parseFloat(amount);
      const newTransaction = await Group.findOneAndUpdate(

        { _id: groupId },
        {
          $addToSet: {
            transactions: {
              transactionname,
              description,
              payer: context.user._id,
              payer,
              amountpaid,
              attachment,
            },
          },
          $addToSet: {
            groupexpenses: {
              amountpaid,
              },
            }
        },
        { new: true, runValidators: true }
      );
      return newTransaction;
    },
// not implemented at at front end yet.
    removeGroup: async (parent, { groupId }, context) => {
      const groupRemoved = await Group.findOneAndDelete({
        _id: groupId,
      });
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { groups: groupId } }
      );

      return groupRemoved;
    },
  },
};

module.exports = resolvers;
