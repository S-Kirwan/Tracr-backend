import { usersModel, expeditionsModel } from "../models/index.js";

async function retrieveExpeditionsByUser(userId) {
	if ((await usersModel.doesUserIdExist(userId)) === false) {
		console.log(userId, "does not exist");
		return null;
	}

	const expeditions = await expeditionsModel.fetchExpeditionsByUserId(userId);

	return expeditions;
}

const service = {
	retrieveExpeditionsByUser,
};

export default service;
