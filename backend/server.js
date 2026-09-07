const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const startMongo = require("./config/db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");
const eventRouter = require("./routes/eventRoute");
const roadmapRouter = require("./routes/roadmapRoute");
require("dotenv").config();
const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:5175", process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());

const Port = process.env.PORT || 8080;

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRouter);
app.use("/event", eventRouter);
app.use("/roadmap", roadmapRouter);

async function startServer() {
  try {
    await startMongo();
    await app.listen(Port, () => {
      console.log(`Server is running in Port ${Port}`);
    });
  } catch (err) {
    console.error(err.message);
  }
}
startServer();
