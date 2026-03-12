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

describe("/api/shapes/daily", () => {
	describe("GET", () => {
		test("Returns one valid shape object", async () => {
			const { body } = await request(app)
				.get("/api/shapes/daily")
				.expect(200);

			const { dailyShape } = body;

			expect(typeof dailyShape.shape_id).toBe("number");
			expect(typeof dailyShape.svg_path).toBe("string");
			expect(typeof dailyShape.name).toBe("string");
			expect(typeof dailyShape.last_daily).toBe("string");
		});
		test("Database last_daily is updated to the current date", async () => {
			const { body } = await request(app)
				.get("/api/shapes/daily")
				.expect(200);

			const {
				dailyShape: { shape_id },
			} = body;

			const dbDailyShape = await db.query(`
                SELECT * FROM shapes
                    WHERE shape_id = ${shape_id}
                `);

			expect(dbDailyShape.rows[0].last_daily.toJSON().slice(0, 10)).toBe(
				new Date().toJSON().slice(0, 10),
			);
		});
		test("Returns same shape for all requests on one day", async () => {
			const { body } = await request(app)
				.get("/api/shapes/daily")
				.expect(200);

			const {
				dailyShape: { shape_id: setShape_id },
			} = body;

			for (let i = 0; i < 50; i++) {
				const { body } = await request(app)
					.get("/api/shapes/daily")
					.expect(200);

				const {
					dailyShape: { shape_id },
				} = body;

				expect(shape_id).toBe(setShape_id);
			}
		});
	});
	describe("Invalid methods", () => {
		test("Invalid methods return 405 & err msg", async () => {
			const { body } = await request(app)
				.post("/api/shapes/daily")
				.expect(405);

			const { error } = body;

			expect(error).toBe("POST invalid method on /api/shapes/daily");
		});
	});
});
