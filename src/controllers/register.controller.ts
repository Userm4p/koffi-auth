import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { encrypt } from "../utils/encrypt";

export interface User {
  name: string;
  last_name: string;
  password: string;
  phone: string;
  email: string;
}

export const userRegisterController = async (
  req: Request<{}, {}, User, {}>,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password, phone, last_name } = req.body;

  const passToSend = await encrypt(password);

  new User({
    last_name,
    email,
    name,
    password: passToSend,
    phone,
  })
    .save()
    .then((user: any) => {
      res.status(200).send({
        user: {
          ...user._doc,
          password: "*******",
        },
      });
    })
    .catch((err: unknown) => {
      res.status(400).send("Error al registrar el usuario");
    });
};
