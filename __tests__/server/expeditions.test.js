import request from "supertest";

import seed from "../../db/seeds/seed.js";
import data from "../../db/data/test-data/index.js";
import db from "../../db/connection.js";
import app from "../../app.js";

import { durationObjToSeconds } from "../../services/service-utils.js";

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
				expect(expedition.userId).toBe(requestedId);
				expect(typeof expedition.shapeId).toBe("number");
				expect(typeof expedition.timestamp).toBe("string");
				expect(typeof expedition.duration).toBe("object");
				expect(typeof expedition.accuracy).toBe("number");
				expect(typeof expedition.svgPoints).toBe("string");
				expect(typeof expedition.distance).toBe("number");
			}
		});
		describe("Query parameters", () => {
			test("Accuracy query", async () => {
				const requestedId = 2;
				const { body } = await request(app)
					.get(
						`/api/users/${requestedId}/expeditions?sort_by=accuracy&order=asc`,
					)
					.expect(200);

				const { expeditions } = body;

				const scores = expeditions.map((trace) => trace.accuracy);

				expect(Array.isArray(expeditions)).toBe(true);
				for (let i = 1; i < expeditions.length; i++) {
					expect(typeof expeditions[i].accuracy).toBe("number");
					expect(typeof expeditions[i].distance).toBe("number");
					expect(typeof expeditions[i].timestamp).toBe("string");
					expect(typeof expeditions[i].duration).toBe("object");
					expect(scores[i]).toBeGreaterThanOrEqual(scores[i - 1]);
				}
			});
			test("Duration query", async () => {
				const requestedId = 2;
				const { body } = await request(app)
					.get(
						`/api/users/${requestedId}/expeditions?sort_by=duration&order=desc`,
					)
					.expect(200);

				const { expeditions } = body;

				const durations = expeditions.map((trace) =>
					durationObjToSeconds(trace.duration),
				);

				expect(Array.isArray(expeditions)).toBe(true);
				for (let i = 1; i < expeditions.length; i++) {
					expect(typeof expeditions[i].accuracy).toBe("number");
					expect(typeof expeditions[i].distance).toBe("number");
					expect(typeof expeditions[i].timestamp).toBe("string");
					expect(typeof expeditions[i].duration).toBe("object");
					expect(durations[i]).toBeLessThan(durations[i - 1]);
				}
			});
			test("Week query", async () => {
				const requestedId = 2;
				const { body } = await request(app)
					.get(`/api/users/${requestedId}/expeditions?time=week`)
					.expect(200);

				const { expeditions } = body;

				const cutOffDate = new Date();
				cutOffDate.setDate(cutOffDate.getDate() - 7);

				const entryDates = expeditions.map(
					(entry) => new Date(entry.timestamp),
				);
				expect(Array.isArray(expeditions)).toBe(true);
				for (let i = 1; i < expeditions.length; i++) {
					expect(typeof expeditions[i].accuracy).toBe("number");
					expect(typeof expeditions[i].distance).toBe("number");
					expect(typeof expeditions[i].timestamp).toBe("string");
					expect(typeof expeditions[i].duration).toBe("object");
					expect(entryDates[i].getTime()).toBeGreaterThan(
						cutOffDate.getTime(),
					);
				}
			});
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
	describe("Invalid methods", () => {
		test("Invalid methods return 405 & err msg", async () => {
			const { body } = await request(app)
				.post("/api/users/2/expeditions")
				.expect(405);

			const { error } = body;

			expect(error).toBe(
				"POST invalid method on /api/users/2/expeditions",
			);
		});
	});
});

describe("/api/expeditions/", () => {
	describe("GET", () => {
		test("Returns all expeditions with valid data", async () => {
			const { body } = await request(app)
				.get("/api/expeditions/")
				.expect(200);

			const { expeditions } = body;

			for (let expedition of expeditions) {
				expect(typeof expedition.userId).toBe("number");
				expect(typeof expedition.shapeId).toBe("number");
				expect(typeof expedition.timestamp).toBe("string");
				expect(typeof expedition.duration).toBe("object");
				expect(typeof expedition.accuracy).toBe("number");
				expect(typeof expedition.svgPoints).toBe("string");
				expect(typeof expedition.distance).toBe("number");
			}
		});
		test("Expeditions are sorted by timestamp descending", async () => {
			const { body } = await request(app)
				.get("/api/expeditions/")
				.expect(200);

			const { expeditions } = body;

			let latestTime = expeditions[0].timestamp;
			for (let i = 1; i < expeditions.length; i++) {
				expect(expeditions[i].timestamp < latestTime).toBe(true);
				latestTime = expeditions[i].timestamp;
			}
		});
	});
	describe("POST", () => {
		test("Posting valid values returns 200", async () => {
			const expedition = {
				userId: 1,
				shapeId: 3,
				coordinates: [
					{
						longitude: 0.13066,
						latitude: 51.51452,
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 500,
				accuracy: 20,
			};

			await request(app)
				.post("/api/expeditions")
				.send(expedition)
				.expect(200);
		});
		test("Invalid posted expedition has 422 error", async () => {
			const expedition = {
				userId: 2,
				coordinates: [
					{
						longitude: 0.13066,
						latitude: 51.51452,
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 200,
				accuracy: 20,
			};

			const { body } = await request(app)
				.post("/api/expeditions")
				.send(expedition)
				.expect(422);

			const { error } = body;

			expect(error).toBe("Validation Failed");
		});
		test("Invalid coordinates object in coordinates array has 422 error", async () => {
			const expedition = {
				userId: 2,
				coordinates: [
					{
						long: 0.13066,
						lat: 51.51452,
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 200,
				accuracy: 20,
			};

			const { body } = await request(app)
				.post("/api/expeditions")
				.send(expedition)
				.expect(422);

			const { error } = body;

			expect(error).toBe("Validation Failed");

			const expedition_two = {
				userId: 2,
				coordinates: [
					{
						longitude: "0.13066",
						latitude: "51.51452",
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 200,
				accuracy: 20,
			};

			const { body: body_two } = await request(app)
				.post("/api/expeditions")
				.send(expedition_two)
				.expect(422);

			const { error: error_two } = body_two;

			expect(error_two).toBe("Validation Failed");
		});
		test("Posted expedition has userId which doesn't exist", async () => {
			const expedition = {
				userId: 21474836,
				shapeId: 4,
				coordinates: [
					{
						longitude: 0.13066,
						latitude: 51.51452,
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 200,
				accuracy: 20,
			};

			const { body } = await request(app)
				.post("/api/expeditions")
				.send(expedition)
				.expect(404);

			const { error } = body;

			expect(error).toBe("Not found - user or shape id does not exist");
		});
		test("Posted expedition has shapeId which doesn't exist", async () => {
			const expedition = {
				userId: 2,
				shapeId: 21474836,
				coordinates: [
					{
						longitude: 0.13066,
						latitude: 51.51452,
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 200,
				accuracy: 20,
			};

			const { body } = await request(app)
				.post("/api/expeditions")
				.send(expedition)
				.expect(404);

			const { error } = body;

			expect(error).toBe("Not found - user or shape id does not exist");
		});
		test("Posted expedition can be retrieved from database, has timestamp defaulted to now", async () => {
			const {
				body: { expeditions: allExpeditions },
			} = await request(app).get("/api/expeditions");

			const insertedExpeditionId = allExpeditions.length + 1;

			const expedition = {
				userId: 1,
				shapeId: 3,
				coordinates: [
					{
						longitude: 0.13066,
						latitude: 51.51452,
					},
					{
						longitude: 0.13069,
						latitude: 51.51457,
					},
				],
				duration: 500,
				accuracy: 20,
			};

			await request(app)
				.post("/api/expeditions")
				.send(expedition)
				.expect(200);

			const { body } = await request(app).get(
				`/api/expeditions/${insertedExpeditionId}`,
			);

			const { expedition: postedExpedition } = body;

			expect(postedExpedition.accuracy).toBe(20);
			expect(durationObjToSeconds(postedExpedition.duration)).toBe(500);
			expect(postedExpedition.userId).toBe(1);
			expect(postedExpedition.shapeId).toBe(3);
			expect(typeof postedExpedition.svgPoints).toBe("string");
			expect(typeof postedExpedition.distance).toBe("number");
			expect(new Date(postedExpedition.timestamp).getTime()).toBeCloseTo(
				Date.now(),
				-5,
			);
		});
	});
	describe("Invalid methods", () => {
		test("Invalid methods return 405 & err msg", async () => {
			const { body } = await request(app)
				.patch("/api/expeditions")
				.expect(405);

			const { error } = body;

			expect(error).toBe("PATCH invalid method on /api/expeditions");
		});
	});
});
