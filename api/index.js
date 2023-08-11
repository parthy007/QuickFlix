const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const ListRoute = require("./routes/lists");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', "DELETE", "PUT"],
    allowedHeaders: ['Content-Type', 'OPTIONS', 'ORIGIN'],
    credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB is running successfully"))
.catch(err => console.log(err))

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",ListRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("Backend server is running !")
});