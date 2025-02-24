import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import express from 'express';
import { typeDefs } from 'src/WebServer/TypeDefs';
import resolvers from 'src/WebServer/Resolvers';
import { getProcEnvNoFail } from 'src/Support/Process';

async function startServer() {
  let port: number;
  try {
    port = parseInt(getProcEnvNoFail("PORT"));
  } 
  catch (e: any) {
    console.error("PORT not set, using default port 4000");
    port = 4000;
  }

  const app = express();    
  const httpServer = http.createServer(app);

  let server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] });
  await server.start();

  app.use(
    '/gql',
    express.json(),
    cors(),
    expressMiddleware(server),
  );

  app.get('/upload', (req, res) => {
    res.send('Hello, Express.js!');
});

  httpServer.listen(port, () => {
    console.log("Server is running on port " + port);
  });

  const shutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}, exiting`);
    httpServer.close(() => {
      console.log("Server closed successfully");
      process.exit(0);
    });
    await server.stop();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer();
