const { constants } = require("./constants");
const { handleSuccess, handleBadRequests, handleError, hashString } = constants;
const User = require("../models/user");
const { generateFromEmail } = require("unique-username-generator");
const { getToken } = require("../utils/utils");

exports.userController = {
  create: async (req, res) => {
    try {
      const { username, email, password, ...data } = req.body;

      const emaillExists = await User.emailAlreadyExists(email);
      if (emaillExists) return handleBadRequests(res, "no email | email exists");

      if (!password || password.length < 4) return handleBadRequests(res, "password not in body | too short");
      const { hash, salt } = hashString(password);
      const user = await User.create({
        username: generateFromEmail(email, 2),
        email: email.trim(),
        password: hash,
        salt,
        ...data,
      });
      return handleSuccess(res, user, "user created", 201);
    } catch (error) {
      return handleError(res, error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.verifyPassword({ email, password });
      if (!user) return handleBadRequests(res, "invalid credentials");

      const result = getToken(user);
      return handleSuccess(res, result, "login success");
    } catch (error) {
      return handleError(res, error);
    }
  },
};
