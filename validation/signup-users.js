import { Joi } from "express-validation";

const signupUserSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).trim().required().messages({
      "string.min": "Must have at least 2 characters",
      "string.max": "Must have max 50 characters",
      "string.required": "This is required",
    }),
    email: Joi.string().email().lowercase().trim().required().messages({
      "string.email": "Must be a valid email address",
      "string.required": "This is required",
    }),
    username: Joi.string()
      .alphanum()
      .min(2)
      .max(25)
      .trim()
      .required()
      .messages({
        "string.min": "Must have at least 2 characters",
        "string.max": "Must have max 25 characters",
        "string.alphanum": "Can only contain letters and numbers",
        "string.required": "This is required",
      }),
    password: Joi.string().min(5).max(25).required().messages({
      "string.min": "Must have at least 5 characters",
      "string.max": "Must have max 25 characters",
      "string.required": "This is required",
    }),
  }),
};

export default signupUserSchema;
