const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//routes
app.use("/api",schoolRoutes);

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});