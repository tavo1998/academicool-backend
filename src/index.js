const express = require("express");
const authRouterV1 = require("./routers/v1/auth");
const institutionRouterV1 = require("./routers/v1/institution");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

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