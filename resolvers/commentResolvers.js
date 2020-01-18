const {
    UserInputError,
    AuthenticationError
} = require('apollo-server')
const Post = require('../models/Post')
const checkAuth = require('../utils/checkAuth')

const commentResolvers = {
    Mutation: {
        createComment: async (_, {
            postId,
            body
        }, context) => {
            const user = checkAuth(context)
            if (body.trim() === "") {
                throw new UserInputError("Input error", {
                    errors: {
                        body: "Comment body must not empty."
                    }
                })
            }
            if (!user) {
                throw new Error('Please login to make a comment.')
            } else {
                let post = await Post.findById(postId)
                if (!post) {
                    throw new Error('Post not exist.')
                }
                post.comments.unshift({
                    username: user.username,
                    body,
                    createdAt: new Date().toISOString()
                })
                await post.save()

                return post
            }
        },

        async deleteComment(_, {
            postId,
            commentId
        }, context) {
            const {
                username
            } = checkAuth(context)
            const post = await Post.findById(postId)
            if (!post) {
                throw new Error('Post not found.')
            }
            const commentIndex = post.comments.findIndex((c) => c.id === commentId)
            if (post.comments[commentIndex].username === username) {
                post.comments.splice(commentIndex, 1)
                await post.save()
                return post
            } else {
                throw new AuthenticationError('Action not allowed.')
            }
        }
    }
}

module.exports = commentResolvers