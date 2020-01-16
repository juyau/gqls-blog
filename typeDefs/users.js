const {
    gql
} = require('apollo-server')

const userTypeDefs = gql `
    type Query {
        getUsers:[User]!
    }

    type Mutation {
        createUser(user: createUserInput!): User!
    }

    input createUserInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String
        createdAt: String
    }
`

module.exports = userTypeDefs