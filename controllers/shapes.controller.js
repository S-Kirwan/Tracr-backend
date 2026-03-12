import { shapesService } from "../services/index.js"

async function getDailyShape(request, response, next) {
	const dailyShape = await shapesService.retrieveDailyShape();

	response.status(200).send({ dailyShape });
	return;
}

const controller = {
    getDailyShape,
}

export default controller;
