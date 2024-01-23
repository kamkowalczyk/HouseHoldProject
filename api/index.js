import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import housesRoute from "./routes/houses.js";
import roomsRoute from "./routes/rooms.js";
import paymentsRoute from "./routes/payment.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from 'body-parser';


const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
});

//middleware
app.use(
    express.urlencoded({ extended: true })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/houses", housesRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/payments", paymentsRoute);

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    connect();
    console.log(`Backend connected on port ${PORT}!`);
});