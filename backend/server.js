import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js"
import employeeRoute from "./routes/employee.routes.js"



dotenv.config({});

const app = express();
mongoose.connect('mongodb://localhost:27017/deals')
    .then(() => {
        console.log("DB connected successfully with mongoose");
    })
    .catch((err) => {
        console.log("DB not connected successfully with mongoose");
        console.error(err); // Log the specific error
    });


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000


app.use("/api/user",userRoute)
app.use("/api/employee",employeeRoute)

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})
