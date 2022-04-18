const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.modifiedPaths().includes("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

const createUser = async (user) => {
  return await User.create(user);
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

module.exports = { createUser, login };