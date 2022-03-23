import express, { Request, Response } from "express"
import authRouterV1 from "./routers/v1/auth";
import institutionRouterV1 from "./routers/v1/institution";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan("tiny"))

app.use("/api/v1/auth", authRouterV1);
app.use("/api/v1/institutions", institutionRouterV1);


app.listen(process.env.PORT, () => {
  console.log("Server running")
})