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
