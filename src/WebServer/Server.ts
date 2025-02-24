import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import express from 'express';
import { typeDefs } from 'src/WebServer/TypeDefs';
import resolvers from 'src/WebServer/Resolvers';
import { getProcEnvNoFail } from 'src/Support/Process';
import storage, { uploadFolder } from './Upload'
import file2Text from 'src/LGLib/TextConvert';


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

  app.post('/upload', storage.single("file"), async (req, res) => {
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const text = await file2Text(req.file);
	
		res.status(200).json({ 
			url: `http://localhost:4000/${uploadFolder()}/${req.file.filename}`,
			text: text
		});
	});

	app.use(`/${uploadFolder()}`, express.static(uploadFolder(), {
		setHeaders: (res, _) => {
			res.setHeader("Content-Disposition", "attachment");
		}
	}));

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
