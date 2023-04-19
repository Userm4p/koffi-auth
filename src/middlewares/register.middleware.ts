import { NextFunction, Request, Response } from "express";
import { User as UserModel } from "../models/user";
import { User } from "../controllers/register.controller";

export const phoneValidate = (phone: string) => /^\d{10}$/.test(phone);
export const ageValidate = (age: string) => /^\d{1,3}$/.test(age);
export const nameValidate = (name: string) =>
  /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,50}$/.test(name);
export const emailValidate = (email: string) =>
  /^[a-zA-Z0-9.!#$%&'*/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    email
  );
export const passValidate = (pass: string) => /^\S{8,}$/.test(pass);

export const userRegisterMiddleware = async (
  req: Request<{}, {}, User, {}>,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name, phone, last_name } = req.body;

  console.log(req.body);

  const userData = async () => {
    return await UserModel.find({
      email,
    });
  };

  const userExist = await userData();

  if (userExist.length > 0) {
    return res.status(400).send("El usuario ya existe");
  }

  if (!email || !password || !last_name || !name || !phone) {
    return res
      .status(400)
      .send("Por favor ingrese todos los campos" );
  }

  if (!emailValidate(email)) {
    return res
      .status(400)
      .send("Por favor ingrese un email válido" );
  }

  if (!passValidate(password)) {
    return res
      .status(400)
      .send("Por favor ingrese una contraseña válida");
  }

  if (!phoneValidate(phone.toString())) {
    return res
      .status(400)
      .send("Por favor ingrese un número de teléfono válido");
  }

  if (!nameValidate(name)) {
    return res
      .status(400)
      .send("Por favor ingrese un nombre válido");
  }

  next();
};
