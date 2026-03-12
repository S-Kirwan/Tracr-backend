import express from "express";
import { validate } from "express-validation";

import { loginUserSchema } from "../validation/index.js";
import { invalidMethod } from "../middleware/index.js";
import { usersController } from "../controllers/index.js";

const router = express.Router();

router
	.route("/login")
	.post(validate(loginUserSchema), usersController.controlUserLogin)
	.all(invalidMethod);

export default router;
