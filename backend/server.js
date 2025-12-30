import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import aiRoutes from "./routes/ai.routes.js";


dotenv.config();


const app = express()

app.use(
  cors({
    origin: "https://ai-resume-builder-accio.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



app.use(express.json());

app.use("/api/ai", aiRoutes);


app.listen(process.env.PORT || 5000, () => console.log(`Server Running at port : ${process.env.PORT}`))
