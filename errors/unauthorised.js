import CustomError from "./custom-error.js";

class UnauthorisedError extends CustomError {
	constructor(msg = "unauthorised access") {
		super(msg, 401);
	}
}

export default UnauthorisedError;
