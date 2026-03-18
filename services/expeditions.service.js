import { usersModel, expeditionsModel, shapesModel } from "../models/index.js";
import { normaliseTraces, coordinatesToLinestring } from "./service-utils.js";

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

async function addExpedition(expedition) {
	const { shapeId, userId, coordinates, duration, accuracy } = expedition;

	if ((await usersModel.doesUserIdExist(userId)) === false) {
		return false;
	}

	if ((await shapesModel.doesShapeExist(shapeId)) === false) {
		return false;
	}

	const linestring = coordinatesToLinestring(coordinates);

	await expeditionsModel.insertExpedition(
		shapeId,
		userId,
		linestring,
		duration,
		accuracy,
	);

	return true;
}

async function retrieveExpeditionById(expedition_id) {
	const expedition =
		await expeditionsModel.fetchExpeditionById(expedition_id);

	if (expedition === null) {
		return null;
	}
	const normalisedExpedition = await normaliseTraces([expedition]);

	return normalisedExpedition[0];
}

const service = {
	retrieveExpeditionsByUser,
	retrieveAllExpeditions,
	retrieveLeaderboards,
	addExpedition,
	retrieveExpeditionById,
};

export default service;
