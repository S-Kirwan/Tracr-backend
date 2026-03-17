import { usersModel, expeditionsModel } from "../models/index.js";
import { normaliseTraces } from "./service-utils.js";

async function retrieveExpeditionsByUser(userId) {
	if ((await usersModel.doesUserIdExist(userId)) === false) {
		return null;
	}

	const expeditions = await expeditionsModel.fetchExpeditionsByUserId(userId);

	const normalisedTraces = await normaliseTraces(expeditions);

	return normalisedTraces;
}

async function retrieveAllExpeditions() {
	const expeditions = await expeditionsModel.fetchAllExpeditions();

	const normalisedTraces = await normaliseTraces(expeditions);

	return normalisedTraces;
}

const service = {
	retrieveExpeditionsByUser,
	retrieveAllExpeditions,
};

export default service;
