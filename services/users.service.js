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

const service = { loginUser };
export default service;
