
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoute = require("./router/taskRoute");
const userRoute = require("./router/userRoute");
const ratelimit=require("express-rate-limit")

const app = express();
const limit=ratelimit({
  windowMs:15*60*1000,
  max: 15,
  message:"You have exceeded hit limits of API"
})
app.use(cors());
app.use(express.json());
app.use(limit)

app.use(taskRoute);
app.use(userRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5050, () => {
      console.log("Server running on port 5050");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
