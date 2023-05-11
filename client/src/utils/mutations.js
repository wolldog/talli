import { gql } from "@apollo/client";

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

export const ADD_GROUP = gql`
  mutation AddGroup($groupname: String) {
    addGroup(groupname: $groupname) {
      _id
      admin {
        _id
        nickname
      }
      groupname
      members {
        _id
        nickname
        email
      }
    }
  }
`;

export const ADD_MEMBER = gql`
  mutation AddMember($email: String, $groupId: ID) {
    addMembers(email: $email, groupId: $groupId) {
      members {
        nickname
        email
        _id
      }
    }
  }
`;

export const ADD_TRANSACTION = gql `
mutation AddTransactions($groupId: ID, $transactionname: String, $description: String, $amountpaid: Float, $attachment: String) {
  addTransactions(groupId: $groupId, transactionname: $transactionname, description: $description, amountpaid: $amountpaid, attachment: $attachment) {
    transactions {
      _id
      transactionname
      amountpaid
    }
  }
}

`;
