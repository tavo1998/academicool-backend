import express, { Request, Response } from "express"

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Hello"
  })
})

app.listen(5000, () => {
  console.log("Server running")
})