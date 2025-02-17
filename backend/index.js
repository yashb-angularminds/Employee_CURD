const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const { errorHandler } = require("./middleware/error");

dotenv.config({
  path: "./.env",
});
const Port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/", routes);

// Global error handler (should be the last middleware)
app.use(errorHandler);

const startServer = async () => {
  try {
    if (!process.env.DB_URI || !process.env.DB_NAME) {
      throw new Error("DB URL and DB name should be defined");
    }
    await connectDB();
    app.listen(Port, () => {
      console.log("Server started", Port);
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};
startServer();
