import CustomError from "./custom-error";

class ConflictError extends CustomError {
	constructor(msg = "conflict") {
		super(msg, 409);
	}
}

export default ConflictError;
