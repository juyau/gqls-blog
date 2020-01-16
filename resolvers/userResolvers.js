const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {
    SECRET_KEY
} = require('.././config')

const userResolvers = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users
            } catch (err) {
                throw err
            }
        }

    },

    Mutation: {
        async createUser(parent, {
            user: {
                username,
                email,
                password,
                confirmPassword
            }
        }) {
            if (username === "" || email === "" || password === "") {
                throw new Error("all fields required.")
            }

            if (password !== confirmPassword) {
                throw new Error("password not match.")
            }


            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })

            const user = await newUser.save()

            const token = jwt.sign({
                username: user.username,
                id: user.id,
                email: user.email
            }, SECRET_KEY, {
                expiresIn: "48h"
            })

            return {
                ...user._doc,
                token,
                id: user._id
            }
        }
    }

}

module.exports = userResolvers