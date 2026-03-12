import express from "express";
import cors from "cors";

import { shapesRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shapes", shapesRouter);

export default app;
