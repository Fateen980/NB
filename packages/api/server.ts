import 'reflect-metadata';
import   express        from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema }  from 'type-graphql';
import { UserResolver } from './admin/services/user/user.resolver';

const app: express.Application = express();
const path = '/admin/graphql';
const PORT = process.env.PORT || 4000;

const main = async () => {
    const schema = await buildSchema({
      resolvers: [
        UserResolver,
      ],
    });
    const apolloServer = new ApolloServer({
      schema,
      introspection: true,
      playground: true,
      tracing: true,
    });
    apolloServer.applyMiddleware({ app, path });
  
    app.listen(PORT, () => {
      console.log(`🚀 started http://localhost:${PORT}${path}`);
    });
  };
  
  main();