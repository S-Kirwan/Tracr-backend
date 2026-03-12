import CustomError from "./custom-error.js";

class NotFoundError extends CustomError {
	constructor(msg = "not found") {
		super(msg, 404);
	}
}

export default NotFoundError;
