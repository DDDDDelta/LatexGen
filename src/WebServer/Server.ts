import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './TypeDefs';
import resolvers from './Resolvers';

async function startServer() {

    const port = 4000;

    let server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer( server, { listen: { port: port } } );
    console.log("server started at port " + port);
    
}

startServer();
