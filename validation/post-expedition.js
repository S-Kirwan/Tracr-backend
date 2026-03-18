import { Joi } from "express-validation";

const pointSchema = Joi.object({
	longitude: Joi.number().required(),
	latitude: Joi.number().required(),
});

const postExpeditionSchema = {
	body: Joi.object({
		shapeId: Joi.number().required(),
		userId: Joi.number().required(),
		coordinates: Joi.array().items(pointSchema).required(),
		duration: Joi.number().required(),
		accuracy: Joi.number().required(),
	}).required(),
};

export default postExpeditionSchema;
