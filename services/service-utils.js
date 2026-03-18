import { parse } from "dotenv";

function createBoundingBox(coords) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;

	for (let point of coords) {
		if (point[0] < minX) {
			minX = point[0];
		}
		if (point[0] > maxX) {
			maxX = point[0];
		}
		if (point[1] < minY) {
			minY = point[1];
		}
		if (point[1] > maxY) {
			maxY = point[1];
		}
	}

	return { minX, minY, maxX, maxY };
}

function normaliseTraceCoords(coords, boundingBox, svgWidth, svgHeight) {
	const width = boundingBox.maxX - boundingBox.minX;
	const height = boundingBox.maxY - boundingBox.minY;
	const padding = 0.1;

	const widthMinusPadding = svgWidth * (1 - padding);
	const heightMinusPadding = svgHeight * (1 - padding);

	const scale = Math.min(
		widthMinusPadding / width,
		heightMinusPadding / height,
	);

	const xOffset = (svgWidth - width * scale) / 2;
	const yOffset = (svgHeight - height * scale) / 2;

	const normalisedRoute = coords.map((point) => {
		const normalisedPoint = {
			x: (point[0] - boundingBox.minX) * scale + xOffset,
			y: svgHeight - ((point[1] - boundingBox.minY) * scale + yOffset),
		};

		return normalisedPoint;
	});

	return normalisedRoute;
}

function parseCoords(coords) {
	let parsedCoords = ""
	for (let point of coords) {
		const x = point.x.toFixed(4);
		const y = point.y.toFixed(4);
		parsedCoords += `${x} ${y}, `
	}

	return parsedCoords;
}

function createSvg(coordinates) {
	const boundingBox = createBoundingBox(coordinates);
	const normalisedTrace = normaliseTraceCoords(
		coordinates,
		boundingBox,
		1,
		1,
	);
	const parsedCoords = parseCoords(normalisedTrace);

	return parsedCoords;
}

async function normaliseTraces(traces) {
	const normalisedTraces = await Promise.all(
		traces.map(async (trace) => {
			const linestring = await JSON.parse(trace.geomjson);
			const normalisedSvgPoints = createSvg(linestring.coordinates);

			const normalisedTrace = {
				svgPoints: normalisedSvgPoints,
				distance: Math.floor(trace.distance),
				duration: trace.duration,
				timestamp: trace.timestamp,
				accuracy: trace.accuracy,
				userId: trace.user_id,
				shapeId: trace.shape_id,
			};

			if (trace.username !== undefined)
				normalisedTrace.username = trace.username;
			return normalisedTrace;
		}),
	);

	return normalisedTraces;
}

function durationObjToSeconds({
	days = 0,
	hours = 0,
	minutes = 0,
	seconds = 0,
}) {
	const daysInSeconds = days * 86400;
	const hoursInSeconds = hours * 3600;
	const minutesInSeconds = minutes * 60;

	return daysInSeconds + hoursInSeconds + minutesInSeconds + seconds;
}

export { normaliseTraces, durationObjToSeconds };
