const {
    gql
} = require('apollo-server')

const userTypeDefs = gql `
    type Query {
        getUsers:[User]!
        getPosts:[Post]!
        getPost(postId: ID!):Post!
    }
    type Mutation {
        register(user: registerInput!): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!):Post!
    }

    type Subscription {
        newPost: Post!
    }
    input registerInput {
        username: String!
        password: String!
        email: String!
        confirmPassword: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        token: String
        createdAt: String
    }
    type Post {
        id: ID!
        username: String!
        body: String!
        createdAt: String
        comments:[Comment]!
        likes:[Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id:ID!
        username: String!
        body: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

`

module.exports = userTypeDefs