const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }
  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    friends: [User]
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
