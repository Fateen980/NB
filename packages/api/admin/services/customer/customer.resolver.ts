import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { getManager } from 'typeorm';

import Customer from '../../entity/Customer';
import NewCustomerInput from './NewCustomerInput';



@Resolver()
export class CustomerResolver {


  @Query(() => Customer)
  async findCustomer(@Arg('phone') phone: string):Promise<Customer | undefined>  {
    // as auth user. check from middleware.
    const manager     = getManager(); 
    const customer = await manager.findOne(Customer, { phone });


    if (customer === undefined) {

       throw new Error('Customer is not found!') 
    }

    return customer;
  }

  @Mutation(() => Customer, { description: 'Add New Customer' })
  async addCustomer(
    @Arg("NewCustomerData") NewCustomerData: NewCustomerInput): Promise<Customer | undefined> {
    
        const manager  = getManager(); 
        const customer = new Customer();
              customer.name     = NewCustomerData.name;
              customer.phone    = NewCustomerData.phone;
              customer.city     = NewCustomerData.city;
              customer.address  = NewCustomerData.address;
              customer.status   = NewCustomerData.status;
              customer.type     = NewCustomerData.type;
              

              await manager.save(customer);
      
              if (customer === undefined) {

                throw new Error('Customer is not found!') 
             }

        return customer;
  }


}