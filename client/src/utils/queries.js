import { gql } from '@apollo/client';

export const QUERY_SINGLE_GROUP = gql`
query Group($groupId: ID!) {
  group(groupId: $groupId) {
    _id
    admin {
      _id
    }
    groupname
    members {
      _id
      nickname
      email
      phone
    }
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    nickname
    email
    phone
    groupsadministrated {
      _id
      groupname
    }
    groups {
      _id
      admin {
        _id
      }
      groupname
      members {
        _id
        nickname
        email
      }
    }
    friends {
      nickname
      _id
      email
      phone
    }
  }
}
`;

