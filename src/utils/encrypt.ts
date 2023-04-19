import bcrypt from "bcrypt";
import environments from "../config/environments";

export const encrypt = async (password: string): Promise<string> => {
  let hash: string = "";

  try {
    hash = await bcrypt.hash(password, Number(environments.SALT));
  } catch (err) {
    console.log(err);
  } finally {
    return hash;
  }
};
