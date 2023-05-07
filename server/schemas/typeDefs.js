const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    nickname: String
    email: String
    phone: String
    groupsadministrated: [Group]
    groups: [Group]
    friends: [User]
  }

  type Group {
    _id: ID!
    admin: User
    groupname: String
    members: [User]
    transactions: [Transaction]
    groupdebit: [Float]
    groupcredit: [Float]
  }

  type Transaction {
    _id: ID!
    transactionname: String
    description: String
    payer: User
    amountpaid: Float
    date: String
    attachment: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(nickname: String): User
    groups: [Group]
    group(groupId: ID!): Group
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(
      nickname: String!
      email: String!
      password: String!
      phone: String!
      avatar: String
    ): Auth
    addFriends(friendId: ID): User
    addGroup(groupname: String, userId: ID): Group
    addMembers(memberId: [ID]): Group
    addTransactions(
      transactionname: String
      description: String
      payer: ID
      amountpaid: Float
      attachment: String
    ): Group
    removeGroup(groupId: ID!): Group
  }
`;

module.exports = typeDefs;
