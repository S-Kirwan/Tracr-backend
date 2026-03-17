import db from "../db/connection.js";

async function fetchExpeditionsByUserId(userId) {
	const expeditions = await db.query(
		`SELECT *
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
            WHERE user_id = $1
			ORDER BY timestamp DESC;
        `,
		[userId],
	);

	return expeditions.rows;
}

async function fetchAllExpeditions() {
	const expeditions = await db.query(
		`SELECT *
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			ORDER BY timestamp DESC;
        `,
	);

	return expeditions.rows;
}

async function fetchLeaderboard(sortBy, order, time) {
	const leaderboard = await db.query(
		`SELECT *
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			WHERE timestamp >= NOW() - INTERVAL '${time}'
			ORDER BY ${sortBy} ${order}
        `,
	);

	return leaderboard.rows;
}

async function fetchLeaderboardAllTime(sortBy, order) {
	const leaderboard = await db.query(
		`SELECT *
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			ORDER BY ${sortBy} ${order}
		`,
	);

	return leaderboard.rows;
}

const model = {
	fetchExpeditionsByUserId,
	fetchAllExpeditions,
	fetchLeaderboard,
	fetchLeaderboardAllTime,
};

export default model;
