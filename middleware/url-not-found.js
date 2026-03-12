import { NotFoundError } from "../errors/index.js";

const urlNotFound = (request, _response, next) => {
	const badUrlError = new NotFoundError(`${request.url} not found`);

	return next(badUrlError);
};

export default urlNotFound;
