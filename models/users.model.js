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

async function isUsernameUnique(username) {
	if ((await findUserByUsername(username)) === null) {
		return true;
	}
	return false;
}

async function insertNewUser(username, password, name) {
	const insertedUser = await db.query(
		`INSERT INTO users (username, password, name)
			VALUES ($1, $2, $3)
			RETURNING username, name;
		`,
		[username, password, name],
	);

	return insertedUser.rows[0];
}

const model = { findUserByUsername, isUsernameUnique, insertNewUser };

export default model;
