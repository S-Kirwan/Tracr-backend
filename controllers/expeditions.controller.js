import { BadRequestError, NotFoundError } from "../errors";
import { expeditionsService } from "../services/index.js";

async function getExpeditionsByUser(request, response, next) {
	const user_id = request.params.user_id;

	if (isNaN(Number(user_id))) {
		next(new BadRequestError("Bad Request - Invalid user_id"));
	}

	const expeditions =
		await expeditionsService.retrieveExpeditionsByUser(user_id);

	if (expeditions === null) {
		next(new NotFoundError("User not found"));
		return;
	}

	response.status(200).send({ expeditions });
}

async function getAllExpeditions(request, response, next) {
	const expeditions = await expeditionsService.retrieveAllExpeditions();

	response.status(200).send({ expeditions });
}

const controller = {
	getExpeditionsByUser,
	getAllExpeditions,
};

export default controller;
