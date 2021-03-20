import { gql } from '@apollo/client';


export const ADD_ORDER = gql`
mutation addOrder($product_id:String!,$price:Float!,$deliveryAmount:Float!,$quantity:Float!,$total:Float!,$date:DateTime!,$deliveryDate:DateTime!,$customer: [String!]!) {
         addOrder(NewOrderData: {
                                 product_id:$product_id,
                                 price:$price,
                                 deliveryAmount:$deliveryAmount,
                                 quantity:$quantity,
                                 total:$total,
                                 date:$date,
                                 deliveryDate:$deliveryDate,
                                 customers:$customer
                                 }){
                 _id
                        
  }
}`;







