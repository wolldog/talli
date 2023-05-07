import { gql } from '@apollo/client';

export const QUERY_USERS_GROUPS = gql`
query Groups {
  groups {
    groupname
    _id
    admin
  }
}
`;

export const QUERY_SINGLE_GROUP = gql`
query Group($groupId: ID!) {
  group(groupId: $groupId) {
    _id
    admin
    groupname
    members {
      _id
      nickname
      email
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
      admin
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

