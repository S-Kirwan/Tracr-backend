import db from "../connection.js";
import format from "pg-format";

async function seed({ expeditionsData, usersData, shapesData }) {
	await db.query(`DROP TABLE IF EXISTS expeditions;`);
	await db.query(`DROP TABLE IF EXISTS users;`);
	await db.query(`DROP TABLE IF EXISTS shapes;`);

	await db.query(
		`
            CREATE TABLE shapes (
                shape_id        INT PRIMARY KEY,
                name            VARCHAR(100),
				last_daily		DATE DEFAULT NULL
            )
        `,
	);

	await db.query(
		`
            CREATE TABLE users (
                user_id     SERIAL PRIMARY KEY,
				email		VARCHAR(255),
                username    VARCHAR(25),
                name        VARCHAR(50),
                password    VARCHAR(25)
            )
        `,
	);

	await db.query(
		`
            CREATE TABLE expeditions (
                expedition_id       SERIAL PRIMARY KEY,
                user_id             INT REFERENCES users(user_id) NOT NULL,
                shape_id            INT REFERENCES shapes(shape_id),
                coordinates         GEOMETRY(LINESTRING, 4326),
                duration		    INTERVAL SECOND,
                accuracy            SMALLINT CHECK (accuracy >= 0 AND accuracy <= 100),
                timestamp           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `,
	);

	const shapesValues = shapesData.map((shape) => {
		return [shape.shapeId, shape.name, shape.last_daily];
	});

	const insertShapesQuery = format(
		`INSERT INTO shapes (shape_id, name, last_daily) VALUES %L`,
		shapesValues,
	);

	await db.query(insertShapesQuery);

	const usersValues = usersData.map((user) => {
		return [user.username, user.name, user.password, user.email];
	});

	const insertUsersQuery = format(
		`INSERT INTO users (username, name, password, email) VALUES %L`,
		usersValues,
	);

	await db.query(insertUsersQuery);

	const expeditionsValues = expeditionsData.map((expedition) => {
		return [
			expedition.user_id,
			expedition.shape_id,
			expedition.coordinates,
			expedition.duration,
			expedition.accuracy,
			expedition.timestamp.toISOString(),
		];
	});

	const formattedExpeditionsValues = expeditionsValues
		.map((row) => {
			return format(
				`(%L, %L, ST_GeomFromText(%L, 4326), %L, %L, %L)`,
				...row,
			);
		})
		.join(", ");

	const insertExpeditionsQuery = `INSERT INTO expeditions
										(user_id, shape_id, coordinates, duration, accuracy, timestamp)
										values ${formattedExpeditionsValues}`;

	await db.query(insertExpeditionsQuery);
}

export default seed;
