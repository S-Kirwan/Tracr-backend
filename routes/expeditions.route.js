import express from "express";

import { expeditionsController } from "../controller/index.js";
import { invalidMethod } from "../middleware/index.js";

const router = express.Router();

router
	.route("/")
	.get(expeditionsController.getAllExpeditions)
	.all(invalidMethod);

export default router;
