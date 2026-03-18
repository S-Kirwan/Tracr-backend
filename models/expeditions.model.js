import format from "pg-format";
import db from "../db/connection.js";

async function fetchExpeditionsByUserId(userId, sortBy, order) {
	const expeditions = await db.query(
		`SELECT *
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
            WHERE user_id = $1
			ORDER BY ${sortBy} ${order};
        `,
		[userId],
	);

	return expeditions.rows;
}

async function fetchExpeditionsByUserIdTimeframe(userId, sortBy, order, time) {
	const expeditions = await db.query(
		`SELECT *
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			WHERE timestamp >= NOW() - INTERVAL '${time}' AND user_id = $1
			ORDER BY ${sortBy} ${order}
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
		`SELECT expeditions.*
			, users.username
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			LEFT JOIN users ON expeditions.user_id = users.user_id
			WHERE timestamp >= NOW() - INTERVAL '${time}'
			ORDER BY ${sortBy} ${order}
        `,
	);

	return leaderboard.rows;
}

async function fetchLeaderboardAllTime(sortBy, order) {
	const leaderboard = await db.query(
		`SELECT expeditions.*
			, users.username
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			LEFT JOIN users ON expeditions.user_id = users.user_id
			ORDER BY ${sortBy} ${order}
        `,
	);

	return leaderboard.rows;
}

async function insertExpedition(
	shapeId,
	userId,
	linestring,
	duration,
	accuracy,
) {
	const formattedExpedition = format(
		`(%L, %L, ST_GeomFromText(%L, 4326), %L, %L)`,
		shapeId,
		userId,
		linestring,
		duration,
		accuracy,
	);

	await db.query(
		`INSERT INTO expeditions
			(shape_id, user_id, coordinates, duration, accuracy)
			values ${formattedExpedition}`,
	);
}

async function fetchExpeditionById(expeditionId) {
	const expedition = await db.query(
		`SELECT expeditions.*
			, users.username
			, ST_Length(coordinates::geography) AS distance
			, ST_AsGeoJSON(coordinates) AS geomJSON
			FROM expeditions
			LEFT JOIN users ON expeditions.user_id = users.user_id
			WHERE expedition_id = $1;
		`,
		[expeditionId],
	);

	if (expedition.rows.length === 0) {
		return null;
	}
	return expedition.rows[0];
}

const model = {
	fetchExpeditionsByUserId,
	fetchAllExpeditions,
	fetchLeaderboard,
	fetchLeaderboardAllTime,
	fetchExpeditionsByUserId,
	fetchExpeditionsByUserIdTimeframe,
	insertExpedition,
	fetchExpeditionById,
};

export default model;
