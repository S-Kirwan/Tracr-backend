import { Joi } from "express-validation";

const signupUserSchema = {
	body: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		username: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
};

export default signupUserSchema;
