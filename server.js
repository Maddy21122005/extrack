const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/connectDB");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();

//config dot env file

//database call
connectDb();

//middlewares

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Authentication middleware
app.use(checkForAuthenticationCookie("token"));

// user routes
app.use("/api/v1/user", require("./routes/user"));

app.get("/", (req, res) => {
  res.send(`<h1>Hello From Server</h1>`);
});

app.use("/api/v1/transaction", require("./routes/transaction"));

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
