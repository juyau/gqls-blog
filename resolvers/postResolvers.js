const Post = require('../models/Post')
const checkAuth = require('../utils/checkAuth')

const postResolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({
                    createdAt: -1
                });
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },

        async getPost(_, {
            postId
        }) {
            try {
                const post = await Post.findById(postId)

                if (post) {
                    return post
                } else {
                    throw new Error("Post not exist.")
                }
            } catch (err) {
                throw new Error(err)
            }

        }
    },

    Mutation: {
        async createPost(parent, {
            body
        }, context) {

            const user = checkAuth(context)
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            try {
                const post = await newPost.save()
                context.pubsub.publish('NEW_POST', {
                    newPost: post
                })
                return post
            } catch (err) {
                throw new Error(err)
            }
        },

        async deletePost(_, {
            postId
        }, context) {
            const user = checkAuth(context)

            try {
                const post = await Post.findById(postId)
                console.log(post)
                if (!post) {
                    throw new Error('Post not found.')
                }
                if (user.username === post.username) {
                    await post.delete()
                    return "Post deleted."
                } else {
                    throw new Error('Action not allowed.')
                }
            } catch (err) {
                throw new Error(err)
            }
        },

        async likePost(_, {
            postId
        }, context) {
            const {
                username
            } = checkAuth(context)
            const post = await Post.findById(postId)

            if (!post) {
                throw new Error('Post not found.')
            }
            const isLiked = post.likes.find(like => like.username === username)

            if (isLiked) {
                post.likes = post.likes.filter(like => like.username !== username)
            } else {
                post.likes.push({
                    username,
                    createdAt: new Date().toISOString()
                })
            }
            await post.save()
            return post
        }
    },

    Subscription: {
        newPost: {
            subscribe: (_, __, {
                pubsub
            }) => pubsub.asyncIterator('NEW_POST')

        }
    }

}

module.exports = postResolvers