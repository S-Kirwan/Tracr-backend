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

async function findUserByEmail(emailAddr) {
	const user = await db.query(
		`SELECT * FROM users
			WHERE email = $1;
		`,
		[emailAddr],
	);

	if (user.rows.length === 0) {
		return null;
	}
	return user.rows[0];
}

async function isEmailUnique(emailAddr) {
	if ((await findUserByEmail(emailAddr)) === null) {
		return true;
	}
	return false;
}

async function insertNewUser(username, password, name, emailAddr) {
	const insertedUser = await db.query(
		`INSERT INTO users (username, password, name, email)
			VALUES ($1, $2, $3, $4)
			RETURNING username, name, user_id;
		`,
		[username, password, name, emailAddr],
	);

	return insertedUser.rows[0];
}

const model = {
	findUserByUsername,
	isUsernameUnique,
	insertNewUser,
	findUserByEmail,
	isEmailUnique,
};

export default model;
