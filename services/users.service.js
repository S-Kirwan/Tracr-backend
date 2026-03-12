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
