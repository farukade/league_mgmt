const { faker } = require("@faker-js/faker/locale/en_NG");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.uniqueId = (l) => {
  return `${l}-xxxxxxxxx`.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

exports.getToken = (user) => {
  const { username, email, _id, role } = user;
  const payload = {
    username,
    email,
    _id,
    role,
  };
  let token = jwt.sign(payload, secret, {
    expiresIn: 300000,
  });
  return {
    token,
    payload,
  };
};

exports.convertToSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

exports.removeWhiteSpaces = (str) => {
  return str
    .toLowerCase()
    .replace(/\s{2,}/g, " ")
    .trim();
};

exports.generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.randomCategoryId = async () => {
  const max = categories.length - 1;
  const min = 0;
  let randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
  return categories[randomIndex]._id;
};
