import { gql } from '@apollo/client';

export const QUERY_USERS_GROUPS = gql`
query Groups {
  groups {
    groupname
  }
}
`;