import CustomError from "./custom-error.js";

class InvalidMethodError extends CustomError {
	constructor(msg = "invalid method") {
		super(msg, 405);
	}
}

export default InvalidMethodError;
