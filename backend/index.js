import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import { connectDb } from "./config/db.connect.js";
import jobRoute from "./routers/job.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 2300;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/v1/job", jobRoute);

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})