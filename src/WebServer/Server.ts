import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './TypeDefs';
import resolvers from './Resolvers';

async function startServer() {
  let port: number;
  try {
    port = parseInt(getProcEnvNoFail("PORT"));
  } 
  catch (e: any) {
    console.error("PORT not set, using default port 4000");
    port = 4000;
  }

  let server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer( server, { listen: { port: port } } );
  console.log("server started at port " + port);
  
}

startServer();
