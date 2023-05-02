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
    balance: Float
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
    removeGroup(groupId: ID!): Group
  }
`;

module.exports = typeDefs;
