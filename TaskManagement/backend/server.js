
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const taskRoute = require("./router/taskRoute");
const userRoute = require("./router/userRoute");
const rateLimit= require("express-rate-limit")

const app = express();
const limit=rateLimit({
  windowMs:15*60*1000,
  limit:10,
  message:"Exceeded limit of accessing api in provided time",
  standardHeaders:'draft-8',
  legacyHeaders:false
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
