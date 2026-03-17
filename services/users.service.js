import { BadRequestError, ConflictError } from "../errors/index.js";
import { usersModel } from "../models/index.js";

async function loginUser(username, password) {
	const user = await usersModel.findUserByUsername(username);

	if (user === null) {
		return null;
	}

	if (password === user.password) {
		return {
			username: user.username,
			name: user.name,
			user_id: user.user_id,
			email: user.email,
		};
	} else {
		return null;
	}
}

async function signUpUser(requestBody) {
	const { name, username, password, email } = requestBody;

	if (
		username.length > 25 ||
		password.length > 25 ||
		name.length > 50 ||
		email.length > 255
	) {
		throw new BadRequestError("Invalid user data");
	}

	if ((await usersModel.isUsernameUnique(username)) === false) {
		throw new ConflictError("Username already exists");
	}
	if ((await usersModel.isEmailUnique(email)) === false) {
		throw new ConflictError("Email already exists");
	}

	const insertedUser = await usersModel.insertNewUser(
		username,
		password,
		name,
		email,
	);

	return insertedUser;
}

const service = { loginUser, signUpUser };

export default service;
