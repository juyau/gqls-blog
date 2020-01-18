const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { DBUrl } = require("./config");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs/users");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    pubsub
  }),
  introspection: true
});

mongoose
  .connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected.");
    return server.listen({
      port: process.env.PORT || 4000
    });
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
