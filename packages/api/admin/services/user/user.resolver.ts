import { Resolver, Query, Arg, Int, Mutation } from 'type-graphql';
import { getManager } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import User from "../../entity/User";


@Resolver()
export class UserResolver {
 

  @Query(() => User)
  async me(@Arg('email') email: string): Promise<User | undefined> {
    // as auth user. check from middleware.
    const manager = getManager(); 
    const user    = await manager.findOne(User, { email });
    
    if(user === undefined){
      throw new Error ('No user found!')
    }
    return user;
  }


  @Mutation(() => User, { nullable:true })
  async   registerUser(@Arg('name')     name:string,
                       @Arg('email')    email:string,
                       @Arg('password') password:string
                  ):Promise<User | undefined> {

        const user             = new User();
        const manager          = getManager(); 
        const isEmailExists    = await manager.findOne(User, { email });

        if(isEmailExists) {
          return undefined
        }

        user.name       = name ;
        user.email      = email;
        user.password   = await bcrypt.hash(password,12);
        user.isActive   = false;  

        const savedUser = manager.save(user);       

        return savedUser;

   }

  

}