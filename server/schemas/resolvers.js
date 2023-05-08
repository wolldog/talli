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

    addFriends: async (_, { friendId }, context) => {
      if (context.user) {
        const updatedFriends = await User.findOneAndUpdate(
          { _id: context.user._id },
          // { _id: "64585357be0a608299a62f78" },
          { $addToSet: { friends: friendId } },
          { new: true, runValidators: true }
        );
        await User.findByIdAndUpdate(
          { _id: friendId },
          // {$addToSet: { friends: "64585357be0a608299a62f78" } }
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
          // admin: userId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          // { _id: userId },
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
              // members: userId,
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

    //   await User.updateMany(
    //     // when testing in apollo: {"memberId": ["id1","id2"]}
    //     { _id: memberId },
    //     { $addToSet: { groups: groupId } },
    //     // { $addToSet: { groups: "64588390dad0960d58153c8d" } },
    //     { new: true, runValidators: true }
    //   );

    addTransactions: async (
      _,
      { groupId, transactionname, description, amountpaid, attachment },
      context
    ) => {
      const newTransaction = await Group.findOneAndUpdate(
        { _id: groupId },
        // { _id: "64575b6ed52dde2f7d54d9cc" },
        {
          $addToSet: {
            transactions: {
              transactionname,
              description,
              payer: context.user._id,
              // payer: "6455c6b978f8093dea6919b5",
              amountpaid,
              attachment,
            },
            groupdebit: amountpaid,
          },
        },
        { new: true, runValidators: true }
      );
      return newTransaction;
    },

    removeGroup: async (parent, { groupId }, context) => {
      const groupRemoved = await Group.findOneAndDelete({
        _id: groupId,
      });
      await User.findOneAndUpdate(
        { _id: context.user._id },
        // { _id: "64559787008c6e8e7a8f6901" },
        { $pull: { groups: groupId } }
      );

      return groupRemoved;
    },
  },
};

module.exports = resolvers;
