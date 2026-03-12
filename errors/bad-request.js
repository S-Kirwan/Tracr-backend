import CustomError from "./custom-error.js";

class BadRequestError extends CustomError {
	constructor(msg = "Bad Request") {
		super(msg, 400);
	}
}

export default BadRequestError;
