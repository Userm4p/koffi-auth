import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  last_name: String,
  phone: String,
});

export const User = mongoose.model("User", userSchema, "users");
