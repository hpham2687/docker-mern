const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB, () => {
    console.log("Connected to mongoDB");
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())

// route
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(9000, () => {
    console.log("Server is running on port 9000");
})