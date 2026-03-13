import request from "supertest";

import seed from "../../db/seeds/seed.js";
import data from "../../db/data/test-data/index.js";
import db from "../../db/connection.js";
import app from "../../app.js";

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe("/api/users/login", () => {
	describe("POST (login request)", () => {
		test("Returns user object with valid username & password request", async () => {
			const loginRequest = {
				username: "pacePusher",
				password: "FiveK_forever",
			};

			const { body } = await request(app)
				.post("/api/users/login")
				.send(loginRequest)
				.expect(200);

			const { user } = body;

			expect(user.username).toBe("pacePusher");
			expect(user.name).toBe("James Okafor");
			expect(typeof user.user_id).toBe("number");
			expect(user.email).toBe("targethitter@gmail.com");
			expect(user.password).toBe(undefined);
		});
		test("Returns 401 unauthorised with invalid username", async () => {
			const loginRequest = {
				username: "edvardMunch",
				password: "tHeSCrEaM",
			};

			const { body } = await request(app)
				.post("/api/users/login")
				.send(loginRequest)
				.expect(401);

			const { error } = body;

			expect(error).toBe("Invalid username or password");
		});
		test("Returns 401 unauthorised with valid username, but incorrect password", async () => {
			const loginRequest = {
				username: "ironfoot99",
				password: "rememberToHydrate",
			};

			const { body } = await request(app)
				.post("/api/users/login")
				.send(loginRequest)
				.expect(401);

			const { error } = body;

			expect(error).toBe("Invalid username or password");
		});
	});
	describe("Invalid methods", () => {
		test("Invalid methods return 405 & err msg", async () => {
			const { body } = await request(app)
				.get("/api/users/login")
				.expect(405);

			const { error } = body;

			expect(error).toBe("GET invalid method on /api/users/login");
		});
	});
});

describe("/api/users/signup", () => {
	describe("POST (signup request)", () => {
		test("Returns success and user object with valid username & password", async () => {
			const signupRequest = {
				username: "magdalenaCarmen",
				name: "Frida Kahlo",
				password: "theWoundedTable22",
				email: "muffin@gmail.com",
			};

			const { body } = await request(app)
				.post("/api/users/signup")
				.send(signupRequest)
				.expect(200);

			const { signedUpUser: user } = body;

			expect(user.username).toBe("magdalenaCarmen");
			expect(user.name).toBe("Frida Kahlo");
			expect(typeof user.user_id).toBe("number");
			expect(user.email).toBe("muffin@gmail.com");
			expect(user.password).toBe(undefined);
		});
		test("Returns 409 conflict error when username already exists", async () => {
			const signupRequest = {
				username: "morningmiler",
				name: "Vincent",
				password: "exercise",
				email: "earlyriser@gmail.com",
			};

			const { body } = await request(app)
				.post("/api/users/signup")
				.send(signupRequest)
				.expect(409);

			const { error } = body;

			expect(error).toBe("Username already exists");
		});
		test("Returns 409 conflict error when email already exists", async () => {
			const signupRequest = {
				username: "run",
				name: "Vincent",
				password: "exercise",
				email: "bigfoot@gmail.com",
			};

			const { body } = await request(app)
				.post("/api/users/signup")
				.send(signupRequest)
				.expect(409);

			const { error } = body;

			expect(error).toBe("Email already exists");
		});
		describe("Signup data invalid for database (too many characters)", () => {
			test("Username characters > 25", async () => {
				const signupRequest = {
					username: "morningmilermilermilermilermilermiler",
					name: "Vincent",
					password: "exercise",
					email: "earlyriser@gmail.com",
				};

				const { body } = await request(app)
					.post("/api/users/signup")
					.send(signupRequest)
					.expect(400);

				const { error } = body;

				expect(error).toBe("Invalid user data");
			});
			test("Password characters > 25", async () => {
				const signupRequest = {
					username: "HotPotato",
					name: "Vincent",
					password: "exerciseexerciseexerciseexerciseexercise",
					email: "earlyriser@gmail.com",
				};

				const { body } = await request(app)
					.post("/api/users/signup")
					.send(signupRequest)
					.expect(400);

				const { error } = body;

				expect(error).toBe("Invalid user data");
			});
			test("Name characters > 50", async () => {
				const signupRequest = {
					username: "NuggetsOnAStick",
					name: "VincentVincentVincentVincentVincentVincentVincentVincentVincentVincentVincentVincent",
					password: "exercise",
					email: "chickennugget@gmail.com",
				};

				const { body } = await request(app)
					.post("/api/users/signup")
					.send(signupRequest)
					.expect(400);

				const { error } = body;

				expect(error).toBe("Invalid user data");
			});
		});
	});
	describe("Invalid methods", () => {
		test("Invalid methods return 405 & err msg", async () => {
			const { body } = await request(app)
				.get("/api/users/signup")
				.expect(405);

			const { error } = body;

			expect(error).toBe("GET invalid method on /api/users/signup");
		});
	});
});
