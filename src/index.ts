import {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} from 'apollo-server-hapi';
import Hapi from '@hapi/hapi';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

async function init() {
  const app = Hapi.server({ port: 5000 });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create WebSocket server
  const wsServer = new WebSocketServer({
    server: app.listener,
    path: '/subscriptions',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginStopHapiServer({ hapiServer: app }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  app.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
  });

  app.route({
    method: 'GET',
    path: '/healthcheck',
    handler: (request, h) => {
      return Date.now();
    },
  });

  await server.start();
  console.log(server.graphqlPath);

  await server.applyMiddleware({ app, cors: true });
  await app.start();
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
