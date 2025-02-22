import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import DBConnSingle from 'src/WebServer/Database';
import { getProcEnvNoFail } from 'src/Support/Process';
import { get } from 'http';

const storeInfo = async (owner: string, text: string) => {
  const db =  DBConnSingle.getDatabase();
  if (db) {
    const result = await db.collection("info").insertOne({
      owner: owner,
      text: text,
    });
    return result.acknowledged;
  }
  return false;
};


const typeDefs = gql`
  type Query { 
    hello: String 
  } 
  type Mutation { 
    storeInfo(owner: String!, text: String!): Boolean! 
  }
`;

const resolvers = { 
  Query: { 
    hello: () => "hi" 
  }, 
  Mutation: { 
    storeInfo: storeInfo 
  } 
};

async function startServer() {
  let port: number;
  try {
    port = parseInt(getProcEnvNoFail("PORT"));
  } 
  catch (e: any) {
    console.error("PORT not set, using default port 4000");
    port = 4000;
  }

  let server = new ApolloServer({ typeDefs, resolvers, introspection: true, });
  const { url } = await startStandaloneServer( server, { listen: { port: port } } );
  console.log("server started at port " + port);
}

startServer();
