import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`

  mutation AddUser($email: String!,  $password: String!, $nickname: String!, $phone: String!) {
  addUser(email: $email, password: $password, nickname: $nickname, phone: $phone) {
    token
    user {
      _id
      email
      nickname
      phone
    }
  }
}
`;