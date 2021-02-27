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