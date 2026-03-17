import CustomError from "./custom-error.js";

class UnprocessableContentError extends CustomError {
	constructor(msg = "Server cannot process provided instructions") {
		super(msg, 422);
	}
}

export default UnprocessableContentError;
