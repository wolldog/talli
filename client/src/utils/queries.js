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
    groupname
    admin
    _id
    members {
      _id
    }

}
}
`;