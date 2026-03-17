import express from "express";

import { expeditionsController } from "../controllers/index.js";
import { invalidMethod } from "../middleware/index.js";

const router = express.Router();

router
	.route("/")
	.get(expeditionsController.getAllExpeditions)
	.all(invalidMethod);

export default router;
