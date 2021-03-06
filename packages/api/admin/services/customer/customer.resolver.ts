import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { getManager } from 'typeorm';

import Customer from '../../entity/Customer';
import NewCustomerInput from './NewCustomerInput';


type DeleteResult =  {
  raw: any;
  affected?: number|null;
}



@Resolver()
export class CustomerResolver {


  @Query(() => Customer)
  async findCustomer(@Arg('phone') phone: string):Promise<Customer | undefined>  {
    // as auth user. check from middleware.
    const manager     = getManager(); 
    const customer    = await manager.findOne(Customer, { phone });

    if (customer === undefined) {
       throw new Error('Customer is not found!') 
    }

    return customer;
  }


  @Query(() => [Customer])
  async allCustomer():Promise<Customer[] | undefined>  {
    // as auth user. check from middleware.
    const manager     = getManager(); 
    const customer    = await manager.find(Customer);

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
      
              if (typeof customer === undefined) {

                throw new Error('Customer is not found!') 
             }

        return customer;
  }


  @Mutation(() => Customer , {description:'Update Customer'})
  async updateCustomer(
    @Arg('phone') phone: string,
    @Arg('city')  city: string
  ):Promise<Customer | undefined>{

    const manager     = getManager(); 
   const customer    = await manager.findOne(Customer, { phone });
    if(typeof customer !== undefined){

         customer!.city     = city;
         await manager.save(customer);

    }

    if (typeof customer === undefined) {

      throw new Error('Customer is not found!') 
    }
   
    return customer

  }


  @Mutation(() => Customer, { description: 'Delete Customer' })
  async deleteCustomer(
    @Arg('phone') phone: string
  ):Promise<Customer | DeleteResult> {

    const manager  = getManager(); 
    const customer = await manager.delete(Customer, { phone });

    return customer
  }

}