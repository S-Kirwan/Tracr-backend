import { ValidationError } from "express-validation";

const errorHandler = (err, _request, response, _next) => {
  let errorMessage;

  // Handle express-validation errors with custom messages
  if (err.statusCode === 400 && err.details) {
    const formattedErrors = {};

    err.details.body?.forEach((error) => {
      const field = error.path[0];
      formattedErrors[field] = error.message;
    });

    return response.status(400).send({ errors: formattedErrors });
  }

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
