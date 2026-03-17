import express from "express";
import { validate } from "express-validation";

import { loginUserSchema, signupUserSchema } from "../validation/index.js";
import { invalidMethod } from "../middleware/index.js";
import {
  usersController,
  expeditionsController,
} from "../controllers/index.js";

const router = express.Router();

router
  .route("/login")
  .post(validate(loginUserSchema), usersController.controlUserLogin)
  .all(invalidMethod);

router
  .route("/signup")
  .post(validate(signupUserSchema), usersController.controlUserSignup)
  .all(invalidMethod);

router
  .route("/:user_id/expeditions")
  .get(expeditionsController.getExpeditionsByUser)
  .all(invalidMethod);

export default router;
