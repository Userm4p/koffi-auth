import express from "express";
import environments from "./config/environments";
import cors from "cors";
import routes from "./routes";
import { connect } from "./db";

const app = express();

connect();
app.set("jwt", environments.JWT);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", routes);

app.listen(environments.PORT, () => {
  console.log(`Server auth running on port ${environments.PORT}`);
});
