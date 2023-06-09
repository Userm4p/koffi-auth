import express from "express";
import jwt from "jsonwebtoken";
import environments from "../config/environments";

const auth = express.Router();

auth.use(function authenticateToken(req, res, next) {
  const authHeader = req.headers["access-token"] as string;
  const token = authHeader;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, environments.JWT as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
});

export default auth;
