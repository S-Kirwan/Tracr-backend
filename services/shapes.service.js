import { shapesModel } from "../models/index.js";

async function retrieveDailyShape() {
	const dailyShape = await shapesModel.fetchDailyShape();
	if (dailyShape !== null) {
		return dailyShape;
	}

	const unusedDailyShapes = await shapesModel.fetchUnusedDailyShapes();
	if (unusedDailyShapes !== null) {
		const randomIndex = Math.floor(
			Math.random() * unusedDailyShapes.length,
		);
		await shapesModel.updateShapeLastDaily(
			unusedDailyShapes[randomIndex].shape_id,
		);
		return unusedDailyShapes[randomIndex];
	}

	const availableDailyShapes = await shapesModel.fetchAvailableDailyShapes();
	if (availableDailyShapes !== null) {
		const randomIndex = Math.floor(
			Math.random() * availableDailyShapes.length,
		);
		await shapesModel.updateShapeLastDaily(
			availableDailyShapes[randomIndex].shape_id,
		);
		return availableDailyShapes[randomIndex];
	}

	const allShapes = await shapesModel.fetchAllShapes();
	const randomIndex = Math.floor(Math.random() * allShapes.length);
	await shapesModel.updateShapeLastDaily(allShapes[randomIndex].shape_id);
	return allShapes[randomIndex];
}

const service = { retrieveDailyShape };
export default service;
