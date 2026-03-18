import express from "express";
import { validate } from "express-validation";

import { expeditionsController } from "../controllers/index.js";
import { postExpeditionSchema } from "../validation/index.js";
import { invalidMethod } from "../middleware/index.js";

const router = express.Router();

router
	.route("/")
	.get(expeditionsController.getAllExpeditions)
	.post(validate(postExpeditionSchema), expeditionsController.postExpedition)
	.all(invalidMethod);

router
	.route("/:expedition_id")
	.get(expeditionsController.getExpeditionById)
	.all(invalidMethod);

export default router;
