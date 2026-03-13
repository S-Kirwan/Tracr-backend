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

describe("api/users/:user_id/expeditons", () => {
	describe("GET", () => {
		test("Returns a list of expeditions with valid userId", async () => {
			const requestedId = 2;
			const { body } = await request(app)
				.get(`/api/users/${requestedId}/expeditions`)
				.expect(200);

			const { expeditions } = body;

			for (let expedition of expeditions) {
				expect(expedition.user_id).toBe(requestedId);
				expect(typeof expedition.shape_id).toBe("number");
				expect(typeof expedition.timestamp).toBe("string");
				expect(typeof expedition.duration).toBe("object");
				expect(typeof expedition.accuracy).toBe("number");
				expect(typeof expedition.coordinates).toBe("string");
			}
		});
		test("Returns empty array when userId has no expeditions", async () => {
			const requestedId = 6;
			const { body } = await request(app)
				.get(`/api/users/${requestedId}/expeditions`)
				.expect(200);

			const { expeditions } = body;

			expect(expeditions.length).toBe(0);
			expect(expeditions).toEqual([]);
		});
		test("Returns 404 not found when userId does not exist", async () => {
			const requestedId = 23094830;
			const { body } = await request(app)
				.get(`/api/users/${requestedId}/expeditions`)
				.expect(404);

			const { error } = body;

			expect(error).toBe("User not found");
		});
		test("Returns 400 bad request when userId is not a number", async () => {
			const requestedId = "pineapple";
			const { body } = await request(app)
				.get(`/api/users/${requestedId}/expeditions`)
				.expect(400);

			const { error } = body;

			expect(error).toBe("Bad Request - Invalid user_id");
		});
	});
});
