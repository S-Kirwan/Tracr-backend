import express from "express";

import { expeditionsController } from "../controllers";
import { invalidMethod } from "../middleware";

const router = express.Router();

router
    .route("/")
    .get(expeditionsController.getAllExpeditions)
    .all(invalidMethod);

export default router;
