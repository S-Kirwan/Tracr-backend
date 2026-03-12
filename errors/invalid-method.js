import CustomError from "./custom-error.js";

class InvalidMethodError extends CustomError {
	constructor(msg = "Invalid Method") {
		super(msg, 405);
	}
}

export default InvalidMethodError;
