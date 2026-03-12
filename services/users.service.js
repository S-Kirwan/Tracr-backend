import { BadRequestError } from "../errors/index.js";
import { usersModel } from "../models/index.js";

async function loginUser(username, password) {
	const user = await usersModel.findUserByUsername(username);

	if (user === null) {
		return null;
	}

	if (password === user.password) {
		return { username: user.username, name: user.name };
	} else {
		return null;
	}
}

async function signUpUser(requestBody) {
	const { name, username, password } = requestBody;

	if (username.length > 25 || password.length > 25 || name.length > 50) {
		throw new BadRequestError("Invalid user data");
	}

	if ((await usersModel.isUsernameUnique(username)) === false) {
		return null;
	}

	const insertedUser = await usersModel.insertNewUser(
		username,
		password,
		name,
	);

	return insertedUser;
}

const service = { loginUser, signUpUser };
export default service;
