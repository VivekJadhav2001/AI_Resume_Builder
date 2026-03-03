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
app.get("/", (req, res) => {
  res.send(`
  <html>
    <head>
      <title>API Server</title>
      <style>
        body{
          margin:0;
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#0f172a,#1e293b);
          font-family:Arial, Helvetica, sans-serif;
          color:white;
        }

        .card{
          background:#111827;
          padding:40px;
          border-radius:12px;
          text-align:center;
          box-shadow:0 10px 25px rgba(0,0,0,0.4);
        }

        h1{
          margin-bottom:10px;
          font-size:32px;
          color:#38bdf8;
        }

        p{
          color:#9ca3af;
          font-size:16px;
        }

        .btn{
          margin-top:20px;
          padding:10px 18px;
          border:none;
          border-radius:6px;
          background:#38bdf8;
          color:black;
          font-weight:bold;
          cursor:pointer;
        }

        .btn:hover{
          background:#0ea5e9;
        }
      </style>
    </head>

    <body>
      <div class="card">
        <h1>🚀 API Server Running</h1>
        <p>Your backend is working perfectly.</p>
        <p>Start hitting endpoints to test the API.</p>
        <button class="btn" onclick="alert('Backend is alive!')">
          Test Server
        </button>
      </div>
    </body>
  </html>
  `);
});

app.use("/api/ai", aiRoutes);


app.listen(process.env.PORT || 5000, () => console.log(`Server Running at port : ${process.env.PORT}`))
