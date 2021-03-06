
import { gql } from '@apollo/client';

export const GET_ALL_CITY = gql`
query {
    allCity {
      _id
      name
    }
  }
`;