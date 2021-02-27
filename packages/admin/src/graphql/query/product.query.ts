import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query {
    allProducts {
    _id
    name
   }
  }
`;
