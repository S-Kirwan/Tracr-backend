import { ValidationError } from "express-validation";

const errorHandler = (err, _request, response, _next) => {
	let errorMessage;

	if (err instanceof ValidationError) {
		err.statusCode = 422;
	}
	if (err.statusCode) {
		errorMessage = err.message;
	} else {
		errorMessage = "Internal Server Error";
		console.log(err);
	}

	const responseStatus = err.statusCode || 500;

	response.status(responseStatus).send({ error: errorMessage });
};

export default errorHandler;
