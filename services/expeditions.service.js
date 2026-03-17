import { usersModel, expeditionsModel } from "../models/index.js";
import { normaliseTraces } from "./service-utils.js";

async function retrieveExpeditionsByUser(userId, query) {
	if ((await usersModel.doesUserIdExist(userId)) === false) {
		return null;
	}

	const { sort_by: sortBy, order, time } = query;

	const intervalMap = {
		day: "1 day",
		week: "7 days",
		month: "1 month",
		year: "1 year",
	};

	const intervalTime = intervalMap[time];

	let expeditions = [];

	if (intervalTime === undefined) {
		expeditions = await expeditionsModel.fetchExpeditionsByUserId(
			userId,
			sortBy,
			order,
		);
	} else {
		expeditions = await expeditionsModel.fetchExpeditionsByUserIdTimeframe(
			userId,
			sortBy,
			order,
			intervalTime,
		);
	}

	const normalisedTraces = await normaliseTraces(expeditions);

	return normalisedTraces;
}

async function retrieveAllExpeditions() {
	const expeditions = await expeditionsModel.fetchAllExpeditions();

	const normalisedTraces = await normaliseTraces(expeditions);

	return normalisedTraces;
}

async function retrieveLeaderboards(query) {
	const { sort_by: sortBy, order, time } = query;

	const intervalMap = {
		day: "1 day",
		week: "7 days",
		month: "1 month",
		year: "1 year",
	};

	const intervalTime = intervalMap[time];

	let leaderboard = [];

	if (intervalTime === undefined) {
		leaderboard = await expeditionsModel.fetchLeaderboardAllTime(
			sortBy,
			order,
		);
	} else {
		leaderboard = await expeditionsModel.fetchLeaderboard(
			sortBy,
			order,
			intervalTime,
		);
	}

	const normalisedLeaderboard = await normaliseTraces(leaderboard);

	return normalisedLeaderboard;
}

const service = {
	retrieveExpeditionsByUser,
	retrieveAllExpeditions,
	retrieveLeaderboards,
};

export default service;
