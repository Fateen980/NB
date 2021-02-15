import { ObjectID } from 'mongodb';
import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { getManager } from 'typeorm';
import   Product      from "../../entity/Product";



@Resolver()
export class ProductResolver {
  
   

    @Query(() => Product)
    async product(@Arg('id') id: string): Promise<Product | undefined> {
      
      const manager     = getManager(); 
      const productId   = new ObjectID(id);
      const product     = await manager.findOne(Product, { _id:productId });

      if(product === undefined){
        throw new Error ('No Product found!');
      }

      return product;
    }


    @Query(() => [Product])
    async allProducts(): Promise<Product[] | undefined> {
      
      const manager       = getManager(); 
      const products      = await manager.find(Product);
    
      return products;
    }


    @Mutation(() => Product, { description: 'Add New Product' })
    async addProduct(
        @Arg('name')  name  :string,
        @Arg('price') price :number
    ):Promise<Product | undefined> {

      const manager       = getManager(); 
      const product       = new Product();
      product.name  = name
      product.price = price
      await manager.save(product);

      return product

    }
    
}