import express from "express";

import { shapesController } from "../controllers/index.js";
import { invalidMethod } from "../middleware/index.js";

const router = express.Router();

router.route("/daily")
    .get(shapesController.getDailyShape)
    .all(invalidMethod);

export default router;
