const {
    ApolloServer,
} = require('apollo-server')
const mongoose = require('mongoose')

const {
    DBUrl
} = require('./config')
const resolvers = require('./resolvers/userResolvers')
const typeDefs = require('./typeDefs/users')

mongoose.connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen({
    port: process.env.PORT || 4000
}).then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`);
});