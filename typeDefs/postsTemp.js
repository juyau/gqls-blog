const {
    gql
} = require('apollo-server')

const postTypeDefs = gql `
    type Query {
        getPosts:[Post]!
    }

    type Mutation {

        createUser(post: createPostInput!): Post!
    }

    input createPostInput {
        username: String!
        body: String!
        createdAt: String
    }

    type Post {
        id: ID!
        username: String!
        body: String!
        createdAt: String
    }
`

module.exports = userTypeDefs