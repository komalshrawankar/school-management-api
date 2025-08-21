const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("School Management API is running. Use /api/addSchool and /api/listSchools");
});

//routes
app.use("/api",schoolRoutes);

const PORT = process.env.PORT||5000;
console.log("MONGO_URI:", process.env.MONGO_URI);
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});