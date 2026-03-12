import { Joi } from "express-validation";

const loginUsersSchema = {
	body: Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

export default loginUsersSchema;