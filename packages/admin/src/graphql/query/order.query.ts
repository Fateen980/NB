import { gql } from '@apollo/client';

export const GET_ALL_ORDER = gql`
query {
  allOrder {
    _id
    product_id
    date
    deliveryDate
    deliveryAmount
    price
    quantity
    total
    customer
  }
}
`;


export const GET_ORDER_DETAILS = gql`
  query ($slug: String!) {
    getOrderDetails(id: $slug) {
    _id
    deliveryDate
    date
    price
    deliveryAmount
    total
    quantity
    status
    customer
  }
}
`;