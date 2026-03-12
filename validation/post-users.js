import { Joi } from "express-validation";

const postUsersSchema = {
	body: Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

export default postUsersSchema;