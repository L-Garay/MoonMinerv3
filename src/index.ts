import {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} from 'apollo-server-hapi';
import Hapi from '@hapi/hapi';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

async function init() {
  const app = Hapi.server({ port: 5000 });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginStopHapiServer({ hapiServer: app })],
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
