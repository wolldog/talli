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

  mutation AddUser($username: String!, $email: String!, $password: String!, $phone: String!) {
  addUser(username: $username, email: $email, password: $password, phone: $phone) {
    token
    user {
      _id
      username
      email
      phone
      
    }
  }
}
`;