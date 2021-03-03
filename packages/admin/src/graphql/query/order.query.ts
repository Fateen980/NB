import { gql } from '@apollo/client';

export const GET_ALL_ORDER = gql`
query {
  allOrder {
    _id
    customer_id
    product_id
    date
    deliveryDate
    deliveryAmount
    price
    quantity
    total
  }
}
`;