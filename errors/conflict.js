import CustomError from "./custom-error.js";

class ConflictError extends CustomError {
	constructor(msg = "conflict") {
		super(msg, 409);
	}
}

export default ConflictError;
