import { gql } from '@apollo/client';


export const ADD_ORDER = gql`
mutation addOrder($customer_id:String!,$product_id:String!,$price:Float!,$deliveryAmount:Float!,$quantity:Float!,$total:Float!,$date:DateTime!,$deliveryDate:DateTime!) {
         addOrder(NewOrderData: {customer_id:$customer_id,
                                 product_id:$product_id,
                                 price:$price,
                                 deliveryAmount:$deliveryAmount,
                                 quantity:$quantity,
                                 total:$total,
                                 date:$date,
                                 deliveryDate:$deliveryDate
                                 }){
                 _id
                        
  }
}`;







