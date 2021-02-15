import { Resolver,Ctx, Query } from 'type-graphql';
import { getManager } from 'typeorm';

import User          from "../../entity/User";
import { myContext } from '../../types/myContext';



@Resolver()
export class MeResolver {
 

@Query(() => User, { nullable : true})
async me(@Ctx() ctx : myContext):Promise<User | null>{

    if(! ctx.req.session.userId){
        return null
    }


    const manager          = getManager(); 
    const isUserExists    = await manager.findOne(User,ctx.req.session.userId);

    if(isUserExists === undefined) {

        return null
    }

    return isUserExists

}

  

}