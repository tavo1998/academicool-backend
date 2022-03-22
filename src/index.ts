import express, { Request, Response } from "express"
import authRouter from "./routers/auth";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan("tiny"))

app.use("/auth", authRouter);

app.use("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "success index" })
})

app.listen(process.env.PORT, () => {
  console.log("Server running")
})