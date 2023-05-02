const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    nickname: String
    email: String
    phone: String
    friends: [User]
  }

  type Group {
    _id: ID!
    groupname: String
    members: [User]
    balance: Float
    expenses: [Expense]
  }

  type Expense {
    _id: ID!
    expensename: String
    description: String
    amount: Float
    payer: User
    date: String
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
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(
      nickname: String
      email: String
      password: String
      phone: String
    ): Auth
    addGroup(
      groupname: String
      members: [String]
      balance: Float
      expenses: [String]
    ): Group
    removeGroup(groupId: ID!): Group
  }
`;

module.exports = typeDefs;
