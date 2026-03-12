import db from "../db/connection.js";

async function findUserByUsername(username) {
	const user = await db.query(
		`SELECT * FROM users
            WHERE username = $1;
        `,
		[username],
	);

	if (user.rows.length === 0) {
		return null;
	}
	return user.rows[0];
}

const model = { findUserByUsername };

export default model;
