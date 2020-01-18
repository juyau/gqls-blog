const postResolvers = require('./postResolvers')
const userResolvers = require('./userResolvers')
const commentResolvers = require('./commentResolvers')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }
}