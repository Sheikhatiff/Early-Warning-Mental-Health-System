import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectToDB } from "./db/dbConfig.js";
import AuthRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js";

dotenv.config({ path: "config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";
const app = express();

app.use("/img/users", express.static(path.join(__dirname, "public/img/users")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);

app.get("/", (_, res) => {
  res.send(`Hello, World! Running in ${ENV} mode.`);
});

app.listen(PORT, () => {
  console.log(`Server is running in ${ENV} mode on http://localhost:${PORT}/`);
  connectToDB();
});
