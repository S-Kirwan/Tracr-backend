import { usersService } from "../services/index.js";
import { ConflictError, UnauthorisedError } from "../errors/index.js";

async function controlUserLogin(request, response, next) {
	const {
		body: { username, password },
	} = request;

	const user = await usersService.loginUser(username, password);

	if (user === null) {
		next(new UnauthorisedError("Invalid username or password"));
		return;
	}

	response.status(200).send({ user });
}

async function controlUserSignup(request, response, next) {
	const { body } = request;

	try {
		const signedUpUser = await usersService.signUpUser(body);

		if (signedUpUser === null) {
			next(new ConflictError("Username already exists"));
			return;
		}

		response.status(200).send({ signedUpUser });
	} catch (error) {
		next(error);
	}
}

const controller = {
	controlUserLogin,
	controlUserSignup,
};

export default controller;
