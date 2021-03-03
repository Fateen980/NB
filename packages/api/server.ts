import 'reflect-metadata';
import   express            from 'express';
import { ApolloServer }     from 'apollo-server-express';
import { buildSchema }      from 'type-graphql';
import { createConnection } from 'typeorm';
import session              from 'express-session';
import  connectRedis        from "connect-redis"
import { redis }            from './redis';
import cors                 from 'cors';
import { UserResolver }     from './admin/services/user/user.resolver';
import { CustomerResolver } from './admin/services/customer/customer.resolver';
import { CityResolver }     from './admin/services/city/city.resolver';
import { ProductResolver }  from './admin/services/product/product.resolver';
import { LoginResolver }    from './admin/services/user/login';
import { OrderResolver }    from './admin/services/order/order.resolver';
import { MeResolver }       from './admin/services/user/me';



declare module 'express-session' {
  interface Session {
     userId: string;
   }
 }


const app: express.Application = express();
const path = '/admin/graphql';
const PORT = process.env.PORT || 4000;


const main = async () => {

    await createConnection();
console.log('fateen');
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
        CustomerResolver,
        CityResolver,
        ProductResolver,
        LoginResolver,
        MeResolver,
        OrderResolver,
      ],
      // authChecker:({context : { req }},roles,) => {

      //   return !!req.session.userId; 
      // }
    });
    const apolloServer = new ApolloServer({
      schema,
      introspection: true,
      playground: true,
      tracing: true,
      context:({ req }: any ) => ({ req })
    });

//  app.use(cors({
//    credentials:true,
//    origin:"http://localhost:3000/"
//  })); 
 
 const RedisStore = connectRedis(session);

app.use(

  session({
    store: new RedisStore ({
      client: redis as any,

    }),
    name:"qid",
    secret:"jdakdka32375785782",
    resave:false,
    saveUninitialized:false,
    cookie:{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 , 
    }
  })
);

    apolloServer.applyMiddleware({ app, path });
  
    app.listen(PORT, () => {
      console.log(`🚀 started http://localhost:${PORT}${path}`);
    });
  };
  
  main();