import db from "../db/connection.js";

async function fetchExpeditionsByUserId(userId) {
	const expeditions = await db.query(
		`SELECT * FROM expeditions
            WHERE user_id = $1
        `,
		[userId],
	);

	return expeditions.rows;
}

const model = {
	fetchExpeditionsByUserId,
};

export default model;
