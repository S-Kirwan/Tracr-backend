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

const model = {
	fetchExpeditionsByUserId,
	fetchAllExpeditions,
};

export default model;
