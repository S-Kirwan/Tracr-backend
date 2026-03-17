import { BadRequestError, NotFoundError } from "../errors/index.js";
import { expeditionsService } from "../services/index.js";
import { validateLeaderboardsQuery } from "./controller-utils.js";

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

async function getLeaderboardExpeditions(request, response, next) {
	const { query } = request;

	const validatedQuery = validateLeaderboardsQuery(query);

	if (validatedQuery instanceof Error) {
		next(validatedQuery);
		return;
	}

	const leaderboard = await expeditionsService.retrieveLeaderboards(query);

	response.status(200).send({ leaderboard });
}

const controller = {
	getExpeditionsByUser,
	getAllExpeditions,
	getLeaderboardExpeditions,
};

export default controller;
