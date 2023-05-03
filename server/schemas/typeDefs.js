const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    nickname: String
    email: String
    phone: String
    friends: [Friend]
  }
  type Friend {
    _id: ID
  }

  type Group {
    _id: ID!
    admin: ID!
    groupname: String
    members: [Member]
    expenses: [Expense]
  }
  type Member {
    _id: ID
  }

  type Expense {
    _id: ID!
    expensename: String
    description: String
    amount: Float
    payer: User
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
    group(groupId: ID!, groupname: String): Group
    expenses: [Expense]
    expense: Expense
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(
      nickname: String
      email: String
      password: String
      phone: String
    ): Auth
    addFriends(userId: ID): User
    addGroup(groupname: String, admin: ID): Group
    addMembers(userId: ID): Group
    addExpense(
      expensename: String
      description: String
      amount: Float
      payer: String
      date: String
      attachment: String
    ): Expense
    removeGroup(groupId: ID!): Group
  }
`;

module.exports = typeDefs;
