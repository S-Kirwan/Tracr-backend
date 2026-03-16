import { usersModel, expeditionsModel } from "../models/index.js";

async function retrieveExpeditionsByUser(userId) {
	if ((await usersModel.doesUserIdExist(userId)) === false) {
		return null;
	}

	const expeditions = await expeditionsModel.fetchExpeditionsByUserId(userId);

	return expeditions;
}

async function retrieveAllExpeditions() {
	const expeditions = await expeditionsModel.fetchAllExpeditions();

	return expeditions;
}

const service = {
	retrieveExpeditionsByUser,
	retrieveAllExpeditions,
};

export default service;
