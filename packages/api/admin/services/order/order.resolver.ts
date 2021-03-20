import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { DeleteWriteOpResultObject, getManager , getMongoRepository } from 'typeorm';
import  {ObjectId} from 'mongodb'
import Order         from '../../entity/Order';
import NewOrderInput from './NewOrderInput'


type DeleteResult =  {
  raw: any;
  affected?: number|null;
}



@Resolver()
export class OrderResolver {


  @Query(() => Order)
  async findOrder(@Arg('_id') _id: string):Promise<Order | undefined>  {
    // as auth user. check from middleware.
    const id = new ObjectId(_id);
    const manager     = getManager(); 
    const customer    = await manager.findOne(Order, { _id:id });

    if (customer === undefined) {
       throw new Error('Order is not found!') 
    }

    return customer;
  }




@Query(() => Order)
async  getOrderDetails(@Arg('id') id: string):Promise<Order | undefined>  {


  const objectid    = new ObjectId(id);
  const manager     = getManager(); 
  const order       = await manager.findOne(Order, { _id:objectid });

  if (order === undefined) {
     throw new Error('Order is not found!') 
  }

  return order;

 }


  @Query(() => [Order])
  async allOrder():Promise<Order[] | undefined>  {
    // as auth user. check from middleware.
    const manager     = getManager(); 
    const order       = await manager.find(Order);

    
    if (order === undefined) {
       throw new Error('No orders are found!') 
    }

    return order;
  }


  @Mutation(() => Order, { description: 'Add New Order' })
  async addOrder(
    @Arg("NewOrderData") NewOrderData: NewOrderInput): Promise<Order | undefined> {
    
        const manager  = getManager(); 
        const order = new Order();
        order.product_id      = NewOrderData.product_id;
        order.price           = NewOrderData.price;
        order.deliveryAmount  = NewOrderData.deliveryAmount;
        order.date            = NewOrderData.date;
        order.deliveryDate    = NewOrderData.deliveryDate;
        order.quantity        = NewOrderData.quantity;  
        order.total           = NewOrderData.total;           
        order.customer        = NewOrderData.customers;
        
        await manager.save(order);

        if (order === undefined) {

        throw new Error('Order is not found!') 
        }

        return order;
  }

  @Mutation(() => Order, { description: 'Delete Order' })
  async deleteOrder(
    @Arg('_id') _id: string
  ):Promise<Order | DeleteResult> {
    const id = new ObjectId(_id);
    const manager  = getManager(); 
    const order = await manager.delete(Order, { _id:id });

    return order
  }

  @Mutation(() => Order, { description: 'Delete All Order' })
  async deleteAllOrders():Promise<Order | DeleteWriteOpResultObject> {
   
    const orderRepository = getMongoRepository(Order);
 
    const order    = await orderRepository.deleteMany({});

    return order
  }


}


