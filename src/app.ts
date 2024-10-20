import express from "express";
import { connectDB } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
import { config } from "dotenv";
import cors from "cors";

config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("working with api");
});

// routes
app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server connected on localhost:${port}`);
});
