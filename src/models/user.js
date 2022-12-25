const mongoose = require("mongoose");
const crypto = require("crypto");
const { pbkdf2Sync } = crypto;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please enter your username"], lowercase: true, unique: true },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Check if email is taken
 * check if username is taken
 */

userSchema.statics.emailAlreadyExists = async function (email) {
  // Find email
  try {
    if (!email || email == "") return true;
    const Emailfound = await this.findOne({ email }).lean();

    return Emailfound ? true : false;
  } catch (error) {
    console.log(error);
    throw new AppError("unable to confirm if Email exists", 400);
  }
};

userSchema.statics.usernameAlreadyExists = async function (username) {
  // Find username
  try {
    const usernamefound = await this.findOne({ username }).lean();

    return usernamefound ? true : false;
    //
  } catch (error) {
    console.log(error);
    throw new AppError("unable to confirm if Username exists", 400);
  }
};

userSchema.statics.verifyPassword = async function ({ username, email, password }) {
  const user = email ? await this.findOne({ email }).lean() : await this.findOne({ username }).lean();
  if (!user) return false;
  if (!password || password == "") return false;

  var hash = pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
  return user.password === hash ? user : false;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
