import { usersService } from "../services/index.js";
import { UnauthorisedError } from "../errors/index.js";

async function controlUserLogin(request, response, next) {
	const {
		body: { username, password },
	} = request;

	const user = await usersService.loginUser(username, password);

	if (user === null) {
		next(new UnauthorisedError("Invalid username or password"));
        return ;
	}

	response.status(200).send({ user });
}

const controller = {
	controlUserLogin,
};

export default controller;
