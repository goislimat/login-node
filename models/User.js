const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

// Generate a random between 8 and 12
const generateSalt = () => Math.floor(Math.random() * 5) + 8;

const userSchema = new Schema({
  email: { type: String, lowercase: true, index: true },
  facebookId: String,
  googleId: String,
  loginMethod: String,
  name: String,
  photo: String,
  password: String
});

userSchema.methods.generateHash = async function(password) {
  const hash = await bcrypt.hash(password, generateSalt());
  return hash;
};

userSchema.methods.validPassword = async function(password) {
  const res = await bcrypt.compare(password, this.password);
  return res;
};

module.exports = mongoose.model("users", userSchema);
