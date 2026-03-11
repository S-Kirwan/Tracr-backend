import express from "express";
import { shapesController } from "../controllers/index.js";

const router = express.Router();

router.route("/daily")
    .get(shapesController.getDailyShape)

export default router;
