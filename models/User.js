const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: { type: String, lowercase: true, index: true },
  password: { type: String }
});

userSchema.methods.generateHash = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

userSchema.methods.validPassword = async function(password) {
  const res = await bcrypt.compare(password, this.password);
  return res;
};

mongoose.model("users", userSchema);
