import db from "../../db/connection.js";
import seed from "../../db/seeds/seed.js";
import data from "../../db/data/test-data/index.js";

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("shapes table", () => {
	describe("shape_id", () => {
		test("shape_id is primary key", async () => {
			const {
				rows: [{ column_name }],
			} = await db.query(
				`SELECT column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY'
                    AND tc.table_name = 'shapes';
            `,
			);

			expect(column_name).toBe("shape_id");
		});
		test("shape_id is serial", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'shapes'
                    AND column_name = 'shape_id';
            `,
			);

			expect(column.column_name).toBe("shape_id");
			expect(column.data_type).toBe("integer");
			expect(column.column_default).toBe(
				"nextval('shapes_shape_id_seq'::regclass)",
			);
		});
	});
	describe("svg_path", () => {
		test("svg_path is varchar max length 1000", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, character_maximum_length
                    FROM information_schema.columns
                    WHERE table_name = 'shapes'
                    AND column_name = 'svg_path';
                `,
			);

			expect(column.column_name).toBe("svg_path");
			expect(column.data_type).toBe("character varying");
			expect(column.character_maximum_length).toBe(1000);
		});
	});
	describe("name", () => {
		test("name is varchar max length 100", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, character_maximum_length
                    FROM information_schema.columns
                    WHERE table_name = 'shapes'
                    AND column_name = 'name';
                `,
			);

			expect(column.column_name).toBe("name");
			expect(column.data_type).toBe("character varying");
			expect(column.character_maximum_length).toBe(100);
		});
	});
	describe("last_daily", () => {
		test("last_daily is date type", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'shapes'
                    AND column_name = 'last_daily';
                `,
			);

			expect(column.column_name).toBe("last_daily");
			expect(column.data_type).toBe("date");
		});
		test("last_daily defaults to NULL", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'shapes'
                    AND column_name = 'last_daily';
                `,
			);

            expect(column.column_name).toBe("last_daily");
            expect(column.column_default).toBe(null);
		});
	});
});

describe("users table", () => {
	describe("user_id", () => {
		test("user_id is primary key", async () => {
			const {
				rows: [{ column_name }],
			} = await db.query(
				`SELECT column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY'
                    AND tc.table_name = 'users';
            `,
			);

			expect(column_name).toBe("user_id");
		});
		test("user_id is serial", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'user_id';
            `,
			);

			expect(column.column_name).toBe("user_id");
			expect(column.data_type).toBe("integer");
			expect(column.column_default).toBe(
				"nextval('users_user_id_seq'::regclass)",
			);
		});
	});
	describe("username", () => {
		test("username is varchar max length 25", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, character_maximum_length
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'username';
                `,
			);

			expect(column.column_name).toBe("username");
			expect(column.data_type).toBe("character varying");
			expect(column.character_maximum_length).toBe(25);
		});
	});
	describe("name", () => {
		test("name is varchar max length 50", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, character_maximum_length
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'name';
                `,
			);

			expect(column.column_name).toBe("name");
			expect(column.data_type).toBe("character varying");
			expect(column.character_maximum_length).toBe(50);
		});
	});
	describe("password", () => {
		test("password is varchar max length 25", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, character_maximum_length
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'password';
                `,
			);

			expect(column.column_name).toBe("password");
			expect(column.data_type).toBe("character varying");
			expect(column.character_maximum_length).toBe(25);
		});
	});
});

describe("expeditions table", () => {
	describe("expedition_id", () => {
		test("expedition_id is primary key", async () => {
			const {
				rows: [{ column_name }],
			} = await db.query(
				`SELECT column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                    ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY'
                    AND tc.table_name = 'expeditions';
            `,
			);

			expect(column_name).toBe("expedition_id");
		});
		test("expedition_id is serial", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'expeditions'
                    AND column_name = 'expedition_id';
            `,
			);

			expect(column.column_name).toBe("expedition_id");
			expect(column.data_type).toBe("integer");
			expect(column.column_default).toBe(
				"nextval('expeditions_expedition_id_seq'::regclass)",
			);
		});
	});
	describe("user_id", () => {
		test("user_id references user_id from users table", async () => {
			const { rows } = await db.query(
				`SELECT *
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                        ON tc.constraint_name = kcu.constraint_name
                    JOIN information_schema.constraint_column_usage AS ccu
                        ON ccu.constraint_name = tc.constraint_name
                    WHERE tc.constraint_type = 'FOREIGN KEY'
                        AND tc.table_name = 'expeditions'
                        AND kcu.column_name = 'user_id'
                        AND ccu.table_name = 'users'
                        AND ccu.column_name = 'user_id'
                `,
			);

			expect(rows).toHaveLength(1);
		});
	});
	describe("shape_id", () => {
		test("shape_id references shape_id from shapes table", async () => {
			const { rows } = await db.query(
				`SELECT *
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                        ON tc.constraint_name = kcu.constraint_name
                    JOIN information_schema.constraint_column_usage AS ccu
                        ON ccu.constraint_name = tc.constraint_name
                    WHERE tc.constraint_type = 'FOREIGN KEY'
                        AND tc.table_name = 'expeditions'
                        AND kcu.column_name = 'shape_id'
                        AND ccu.table_name = 'shapes'
                        AND ccu.column_name = 'shape_id'
                `,
			);

			expect(rows).toHaveLength(1);
		});
	});
	describe("coordinates", () => {
		test("coordinates is geometry linestring", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT f_geometry_column, type
                    FROM geometry_columns
                    WHERE f_table_name = 'expeditions'
                    AND f_geometry_column = 'coordinates';
                `,
			);

			expect(column.f_geometry_column).toBe("coordinates");
			expect(column.type).toBe("LINESTRING");
		});
	});
	describe("duration_seconds", () => {
		test("duration is interval second", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
                    FROM pg_catalog.pg_attribute a
                    JOIN pg_catalog.pg_class c ON a.attrelid = c.oid
                    WHERE c.relname = 'expeditions'
                    AND a.attname = 'duration_seconds'
                    AND a.attnum > 0;
                `,
			);
			expect(column.attname).toBe("duration_seconds");
			expect(column.data_type).toBe("interval second");
		});
	});
	describe("accuracy", () => {
		test("accuracy is a smallint", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'expeditions'
                    AND column_name = 'accuracy';
                `,
			);

			expect(column.column_name).toBe("accuracy");
			expect(column.data_type).toBe("smallint");
		});
		test("accuracy has constraint to be between 0 and 100", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT cc.constraint_name, cc.check_clause
                    FROM information_schema.check_constraints cc
                    JOIN information_schema.constraint_column_usage ccu
                    ON cc.constraint_name = ccu.constraint_name
                    WHERE ccu.table_name = 'expeditions'
                    AND ccu.column_name = 'accuracy';
                `,
			);
			expect(column.check_clause).toBe(
				"(((accuracy >= 0) AND (accuracy <= 100)))",
			);
		});
	});
	describe("timestamp", () => {
		test("timestamp has data type of timestamp", async () => {
			const {
				rows: [column],
			} = await db.query(
				`SELECT column_name, data_type
                    FROM information_schema.columns
                    WHERE table_name = 'expeditions'
                    AND column_name = 'timestamp';
                `,
			);

			expect(column.column_name).toBe("timestamp");
			expect(column.data_type).toBe("timestamp without time zone");
		});
		test("timestamp has default value of current timestamp", async () => {
			const {
				rows: [{ column_default }],
			} = await db.query(
				`SELECT column_default
                    FROM information_schema.columns
                    WHERE table_name = 'expeditions'
                    AND column_name = 'timestamp';
                `,
			);

			expect(column_default).toBe("CURRENT_TIMESTAMP");
		});
	});
});
