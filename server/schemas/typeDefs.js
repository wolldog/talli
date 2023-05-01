const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    nickname: String!
    email: String!
    phone: String!
    friends: [User]
  }

  type Group {
    _id: ID!
    groupname: String!
    members: [User]
    balance: Float
    expenses: [Expense]
  }

  input GroupInput {
    _id: ID!
    groupname: String!
    members: [String]
    balance: Float
    expenses: [String]
  }

  input MemberInput {
    members: [String]
  }

  type Expense {
    _id: ID!
    expensename: String!
    description: String!
    amount: Float
    payer: User
    date: String
  }

  input ExpenseInput {
    expensename: String!
    description: String!
    amount: Float
    payer: String
    date: String
  }

  type Query {
    me: User
    users: [User]
    group: Group
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(
      nickname: String!
      email: String!
      password: String!
      phone: String!
    ): Auth
    addGroup(group: GroupInput): Group
    addMembers(members: MemberInput): Group
    addExpense(expense: ExpenseInput): Expense
    removeGroup(groupId: ID!): Group
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
