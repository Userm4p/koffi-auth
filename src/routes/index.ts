import { Router } from "express";
import { userRegisterMiddleware } from "../middlewares/register.middleware";
import { userRegisterController } from "../controllers/register.controller";

const routes = Router();

routes.post("/register", userRegisterMiddleware, userRegisterController);

export default routes;
