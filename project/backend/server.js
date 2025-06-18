import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/dbConfig.js";
import AuthRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js";

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);

app.get("/", (_, res) => {
  res.send(`Hello, World! Running in ${ENV} mode.`);
});

app.listen(PORT, () => {
  console.log(`Server is running in ${ENV} mode on http://localhost:${PORT}/`);
  connectToDB();
});
