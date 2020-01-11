const {
    ApolloServer,
    gql
} = require('apollo-server')

const mongoose = require('mongoose')

const {
    DBUrl
} = require('./config')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String
})

const User = mongoose.model("User", userSchema)

mongoose.connect(DBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const typeDefs = gql `
    type Query {
        getUsers:[User]!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String
    }
`

const resolvers = {
    Query: {
        async getUsers() {
            const users = await User.find();
            return users
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// server.listen().then(({
//     url
// }) => {
//     console.log(`GraphQL server running at ${url}`)
// })


server.listen({
    port: process.env.PORT || 4000
}).then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`);
});