import { gql } from '@apollo/client';


export const ADD_CUSTOMER = gql`
mutation addCustomer($name:String!,$phone:String!,$city:Float!,$status:Float!,$type:Float!,$address:String!) {
         addCustomer(NewCustomerData: {name:$name,phone:$phone,city:$city,status:$status,type:$type,address:$address}){
                 _id
                 name       
  }
}`;

// export const ADD_PRODUCT = gql`
// mutation addProduct($name:String!,$price:Float!){
//   addProduct(name:$name,price:$price){
//     _id
//     name
//     price
//   }
// }`;





