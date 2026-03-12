import express from "express";
import cors from "cors";

import errorHandler from "./middleware/error-handler.js";
import urlNotFound from "./middleware/url-not-found.js";

import { shapesRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shapes", shapesRouter);

app.all("/*splat", urlNotFound);

app.use(errorHandler);

export default app;
