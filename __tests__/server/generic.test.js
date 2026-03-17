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

describe("Bad URL", () => {
	test("Returns 404 url not found", async () => {
        const badUrl = "/pineapple";

		const { body } = await request(app)
            .get(badUrl)
            .expect(404);

		const { error } = body;

		expect(error).toBe(`${badUrl} not found`);
	});
});
