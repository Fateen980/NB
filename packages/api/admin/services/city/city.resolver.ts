import { ObjectID } from 'mongodb';
import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { getManager } from 'typeorm';
import City from "../../entity/City";



@Resolver()
export class CityResolver {
  
   

    @Query(() => City)
    async city(@Arg('id') id: string): Promise<City | undefined> {
      
      const manager     = getManager(); 
      const cityId      = new ObjectID(id);
      const city        = await manager.findOne(City, { _id:cityId });

      if(city === undefined){
        throw new Error ('No City found!');
      }

      return city;
    }


    @Query(() => [City])
    async allCity(): Promise<City[] | undefined> {
      
      const manager     = getManager(); 
      const cities      = await manager.find(City);
    
      return cities;
    }


    @Mutation(() => City, { description: 'Add New City' })
    async addCity(@Arg('name')name:string):Promise<City | undefined> {

      const manager  = getManager(); 
      const city = new City();
            city.name = name
            await manager.save(city);

       if(city === undefined){
         throw new Error('Can Not be saved!')
       }

      return city

    }
    
}