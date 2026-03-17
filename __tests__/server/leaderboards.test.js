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

describe("api/leaderboards", () => {
	describe("GET", () => {
		test("No query params, returns default all time sorted by latest first", async () => {
			const { body } = await request(app)
				.get("/api/leaderboards")
				.expect(200);

			const { leaderboard } = body;

			const timestamps = leaderboard.map((entry) =>
				new Date(entry.timestamp).getTime(),
			);
			expect(Array.isArray(leaderboard)).toBe(true);
			for (let i = 1; i < leaderboard.length; i++) {
				expect(typeof leaderboard[i].accuracy).toBe("number");
				expect(typeof leaderboard[i].distance).toBe("number");
				expect(typeof leaderboard[i].timestamp).toBe("string");
				expect(typeof leaderboard[i].duration).toBe("object");
				expect(typeof leaderboard[i].username).toBe("string");
				expect(timestamps[i]).toBeLessThan(timestamps[i - 1]);
			}
		});
		test("Distance query ASC", async () => {
			const { body } = await request(app)
				.get("/api/leaderboards?sort_by=distance&order=ASC")
				.expect(200);

			const { leaderboard } = body;

			const distances = leaderboard.map((entry) => entry.distance);
			expect(Array.isArray(leaderboard)).toBe(true);
			for (let i = 1; i < leaderboard.length; i++) {
				expect(typeof leaderboard[i].accuracy).toBe("number");
				expect(typeof leaderboard[i].distance).toBe("number");
				expect(typeof leaderboard[i].timestamp).toBe("string");
				expect(typeof leaderboard[i].duration).toBe("object");
				expect(typeof leaderboard[i].username).toBe("string");

				expect(distances[i]).toBeGreaterThan(distances[i - 1]);
			}
		});
		test("Duration query DESC", async () => {
			const { body } = await request(app)
				.get("/api/leaderboards?sort_by=duration&order=desc")
				.expect(200);

			const { leaderboard } = body;

			const durations = leaderboard.map((entry) =>
				durationObjToSeconds(entry.duration),
			);

			expect(Array.isArray(leaderboard)).toBe(true);
			for (let i = 1; i < leaderboard.length; i++) {
				expect(typeof leaderboard[i].accuracy).toBe("number");
				expect(typeof leaderboard[i].distance).toBe("number");
				expect(typeof leaderboard[i].timestamp).toBe("string");
				expect(typeof leaderboard[i].duration).toBe("object");
				expect(typeof leaderboard[i].username).toBe("string");

				expect(durations[i]).toBeLessThan(durations[i - 1]);
			}
		});
		test("Accuracy query DESC", async () => {
			const { body } = await request(app)
				.get("/api/leaderboards?sort_by=accuracy&order=desc")
				.expect(200);

			const { leaderboard } = body;

			const scores = leaderboard.map((entry) => entry.accuracy);

			expect(Array.isArray(leaderboard)).toBe(true);
			for (let i = 1; i < leaderboard.length; i++) {
				expect(typeof leaderboard[i].accuracy).toBe("number");
				expect(typeof leaderboard[i].distance).toBe("number");
				expect(typeof leaderboard[i].timestamp).toBe("string");
				expect(typeof leaderboard[i].duration).toBe("object");
				expect(typeof leaderboard[i].username).toBe("string");

				expect(scores[i]).toBeLessThan(scores[i - 1]);
			}
		});
		describe("Time parameters", () => {
			test("Day", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?time=day")
					.expect(200);

				const { leaderboard } = body;

				const cutOffDate = new Date();
				cutOffDate.setDate(cutOffDate.getDate() - 1);

				const entryDates = leaderboard.map(
					(entry) => new Date(entry.timestamp),
				);
				for (let i = 0; i < leaderboard.length; i++) {
					expect(typeof leaderboard[i].accuracy).toBe("number");
					expect(typeof leaderboard[i].distance).toBe("number");
					expect(typeof leaderboard[i].timestamp).toBe("string");
					expect(typeof leaderboard[i].duration).toBe("object");
					expect(typeof leaderboard[i].username).toBe("string");

					expect(entryDates[i].getTime()).toBeGreaterThan(
						cutOffDate.getTime(),
					);
				}
			});
			test("Week", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?time=week")
					.expect(200);

				const { leaderboard } = body;

				const cutOffDate = new Date();
				cutOffDate.setDate(cutOffDate.getDate() - 7);

				const entryDates = leaderboard.map(
					(entry) => new Date(entry.timestamp),
				);
				for (let i = 0; i < leaderboard.length; i++) {
					expect(typeof leaderboard[i].accuracy).toBe("number");
					expect(typeof leaderboard[i].distance).toBe("number");
					expect(typeof leaderboard[i].timestamp).toBe("string");
					expect(typeof leaderboard[i].duration).toBe("object");
					expect(typeof leaderboard[i].username).toBe("string");

					expect(entryDates[i].getTime()).toBeGreaterThan(
						cutOffDate.getTime(),
					);
				}
			});
			test("Month", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?time=month")
					.expect(200);

				const { leaderboard } = body;

				const cutOffDate = new Date();
				cutOffDate.setDate(cutOffDate.getDate() - 30);

				const entryDates = leaderboard.map(
					(entry) => new Date(entry.timestamp),
				);
				for (let i = 0; i < leaderboard.length; i++) {
					expect(typeof leaderboard[i].accuracy).toBe("number");
					expect(typeof leaderboard[i].distance).toBe("number");
					expect(typeof leaderboard[i].timestamp).toBe("string");
					expect(typeof leaderboard[i].duration).toBe("object");
					expect(typeof leaderboard[i].username).toBe("string");

					expect(entryDates[i].getTime()).toBeGreaterThan(
						cutOffDate.getTime(),
					);
				}
			});
			test("Year", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?time=year")
					.expect(200);

				const { leaderboard } = body;

				const cutOffDate = new Date();
				cutOffDate.setDate(cutOffDate.getDate() - 365);

				const entryDates = leaderboard.map(
					(entry) => new Date(entry.timestamp),
				);
				for (let i = 0; i < leaderboard.length; i++) {
					expect(typeof leaderboard[i].accuracy).toBe("number");
					expect(typeof leaderboard[i].distance).toBe("number");
					expect(typeof leaderboard[i].timestamp).toBe("string");
					expect(typeof leaderboard[i].duration).toBe("object");
					expect(typeof leaderboard[i].username).toBe("string");

					expect(entryDates[i].getTime()).toBeGreaterThan(
						cutOffDate.getTime(),
					);
				}
			});
		});
		describe("Invalid parameters return unprocessable content error", () => {
			test("Invalid sort_by", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?sort_by=pineapple&order=desc")
					.expect(422);

				const { error } = body;

				expect(error).toBe("Invalid sort query");
			});
			test("Invalid time", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?time=mainecoon")
					.expect(422);

				const { error } = body;

				expect(error).toBe("Invalid time query");
			});
			test("Invalid order", async () => {
				const { body } = await request(app)
					.get("/api/leaderboards?sort_by=accuracy&order=sausagedog")
					.expect(422);

				const { error } = body;

				expect(error).toBe("Invalid order query");
			});
			test("All queries invalid", async () => {
				const { body } = await request(app)
					.get(
						"/api/leaderboards?sort_by=chair&order=dachshund&time=future",
					)
					.expect(422);

				const { error } = body;

				expect(error).toBe("Invalid sort query");
			});
		});
	});
});
