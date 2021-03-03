import { gql } from '@apollo/client';

export  const ALL_CUSTOMER = gql`
query {
        allCustomer {
                      _id
                      name
                      phone
                      city
                      status
                      type
                      address
            }
         }
      `;

export const FIND_CUSTOMER_BY_PHONE = gql`
query ($phone:String!) {
    findCustomer (phone:$phone){
    name
    }
  }
`;

