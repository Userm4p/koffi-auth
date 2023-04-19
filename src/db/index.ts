import mongoose from "mongoose";
import environments from "../config/environments";

export const connect = async () => {
  try {
    await mongoose.connect(environments.DB!);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
