import express from "express"
import authRouter from "./routers/auth";

const app = express();

app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running")
})