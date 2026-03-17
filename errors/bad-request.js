import CustomError from "./custom-error.js";

class BadRequestError extends CustomError {
	constructor(msg = "bad request") {
		super(msg, 400);
	}
}

export default BadRequestError;
