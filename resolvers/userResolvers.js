const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../models/User");
const { SECRET_KEY } = require(".././config");
const {
  validateRegisterInput,
  validateLoginInput
} = require("../utils/validators");

const generateToken = user => {
  return jwt.sign(
    {
      username: user.username,
      id: user.id,
      email: user.email
    },
    SECRET_KEY,
    {
      expiresIn: "48h"
    }
  );
};

const userResolvers = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Erroe(err);
      }
    }
  },

  Mutation: {
    async register(
      parent,
      { user: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Erros", {
          errors
        });
      }

      const oldUser = await User.findOne({
        username
      });
      if (oldUser) {
        throw new UserInputError("user already exist.", {
          errors: "This username is already taken."
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      });

      const user = await newUser.save();

      const token = generateToken(user);

      return {
        ...user._doc,
        token,
        id: user._id
      };
    },

    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Login errors", {
          errors
        });
      }

      const user = await User.findOne({
        username
      });
      if (!user) {
        errors.general = "User not found.";
        throw new UserInputError("Credential errors", {
          errors
        });
      }

      const matching = bcrypt.compareSync(password, user.password);

      if (!matching) {
        errors.general = "Password not correct.";
        throw new UserInputError("Credential errors", {
          errors
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    }
  }
};

module.exports = userResolvers;
