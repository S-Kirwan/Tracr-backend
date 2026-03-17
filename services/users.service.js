import { BadRequestError, ConflictError } from "../errors/index.js";
import { usersModel } from "../models/index.js";
import bcrypt from "bcrypt";
async function loginUser(username, password) {
  const user = await usersModel.findUserByUsername(username);

  if (user === null) {
    return null;
  }

  // Compare plain password with hashed password from database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    username: user.username,
    name: user.name,
    user_id: user.user_id,
    email: user.email,
  };
}

async function signUpUser(requestBody) {
  const { name, username, password, email } = requestBody;

  if ((await usersModel.isUsernameUnique(username)) === false) {
    throw new ConflictError("Username already exists");
  }
  if ((await usersModel.isEmailUnique(email)) === false) {
    throw new ConflictError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const insertedUser = await usersModel.insertNewUser(
    username,
    hashedPassword,
    name,
    email,
  );

  return insertedUser;
}

const service = { loginUser, signUpUser };
export default service;
