import { Resolver,Arg,Mutation, Ctx } from 'type-graphql';
import { getManager } from 'typeorm';
import * as bcrypt    from 'bcryptjs';

import User          from "../../entity/User";
import { myContext } from '../../types/myContext';
import { ObjectID } from 'mongodb';


@Resolver()
export class LoginResolver {
 

@Mutation(() => User, { nullable:true })
async   login( @Arg('email')    email:string,
               @Arg('password') password:string,
               @Ctx() Ctx:myContext
             ):Promise<User | null> {

        const user             = new User();
        const manager          = getManager(); 
        const isUserExists    = await manager.findOne(User, { email });


        if(! isUserExists){

            return null
        }

        const isValidPassword = await bcrypt.compare(password,isUserExists.password)

        if(! isValidPassword) {

            return null
        }

        

        Ctx.req.session.userId = isUserExists._id.toString();

        return isUserExists;

   }

  

}