const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const globalErrorHandler = require("./controllers/errorController");

const taskRouter = require("./routes/taskRoute");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/AppError");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("server is starting");
});

app.get("/api/v1/", (req, res) => {
  return res.status(200).send("version 1 server is running  .");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  throw new AppError("Route does not exists", 404);
});

app.use(globalErrorHandler);

module.exports = app;
