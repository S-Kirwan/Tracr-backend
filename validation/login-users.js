import { Joi } from "express-validation";

const loginUsersSchema = {
  body: Joi.object({
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

export default loginUsersSchema;
