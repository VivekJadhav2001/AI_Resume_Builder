import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import aiRoutes from "./routes/ai.routes.js";
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost:5174",
];


const app = express()

app.use(
  cors({
    origin: allowedOrigins, // frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



app.use(express.json());

app.use("/api/ai", aiRoutes);


app.listen(process.env.PORT || 5000,()=>console.log(`Server Running at port : ${process.env.PORT}`))
