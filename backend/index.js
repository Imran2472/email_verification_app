import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./Utils/ConnectDataBase.js";
import UserRoute from "./Routes/User.Route.js";
const app = express();
dotenv.config();
app.use(json());
const port = process.env.PORT || 4001;
ConnectDb();
app.use(
  cors({
    origin: true,
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);
app.use("/v1/api/user", UserRoute);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the server !",
  });
});

app.listen(port, () => {
  console.log(`Server is Running to http://localhost:${port}`);
});
