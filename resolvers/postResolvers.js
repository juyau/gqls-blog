const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Post = require('../models/User')
const {
    SECRET_KEY
} = require('../config')

const postResolvers = {
    Query: {
        async getUsers() {
            const users = await User.find();
            return users
        },
    },

    Mutation: {
        async createUser(parent, {

        })
    }

}

module.exports = postResolvers