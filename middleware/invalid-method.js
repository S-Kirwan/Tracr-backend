import { InvalidMethodError } from "../errors/index.js";

const invalidMethod = (request, _response, next) => {
	const invalidMethodErr = new InvalidMethodError(
		`${request.method} invalid method on ${request.originalUrl}`,
	);

	next(invalidMethodErr);
	return;
};

export default invalidMethod;
