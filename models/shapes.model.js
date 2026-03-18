import db from "../db/connection.js";

async function fetchAllShapes() {
	const shapes = await db.query(
		`SELECT * FROM shapes;
        `,
	);

	return shapes.rows;
}

async function fetchDailyShape() {
	const dailyShape = await db.query(
		`SELECT * FROM shapes
			WHERE last_daily = CURRENT_DATE;
		`,
	);

	if (dailyShape.rows.length === 0) {
		return null;
	}
	return dailyShape.rows[0];
}

async function fetchUnusedDailyShapes() {
	const unusedDailyShapes = await db.query(
		`SELECT * FROM shapes
            WHERE last_daily is null;
        `,
	);

	if (unusedDailyShapes.rows.length === 0) {
		return null;
	}
	return unusedDailyShapes.rows;
}

// shapes are only available when they haven't been picked for 50 days
async function fetchAvailableDailyShapes() {
	const minimumUnusedDays = 50;
	const availableDailyShapes = await db.query(
		`SELECT * FROM shapes
            WHERE (CURRENT_DATE - last_daily > ${minimumUnusedDays});
        `,
	);

	if (availableDailyShapes.rows.length === 0) {
		return null;
	}
	return availableDailyShapes.rows;
}

async function updateShapeLastDaily(shape_id) {
	await db.query(
		`UPDATE shapes
            SET last_daily = CURRENT_DATE
            WHERE shape_id = ${shape_id};
        `,
	);
}

async function fetchShapeById(shapeId) {
	const shape = await db.query(
		`SELECT * FROM shapes
			WHERE shape_id = $1
		`,
		[shapeId],
	);

	if (shape.rows.length === 0) {
		return null;
	}
	return shape.rows[0];
}

async function doesShapeExist(shapeId) {
	if ((await fetchShapeById(shapeId)) === null) {
		return false;
	}
	return true;
}

const model = {
	fetchAllShapes,
	fetchDailyShape,
	fetchUnusedDailyShapes,
	fetchAvailableDailyShapes,
	updateShapeLastDaily,
	fetchShapeById,
	doesShapeExist,
};

export default model;
