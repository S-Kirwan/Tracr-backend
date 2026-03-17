import { UnprocessableContentError } from "../errors/index.js";

function validateTracesQuery(query) {
	const VALID_SORT_BY = ["duration", "accuracy", "timestamp", "distance"];
	const VALID_TIME = ["day", "week", "month", "year"];
	const VALID_ORDER = ["ASC", "DESC"];

	if (query.sort_by !== undefined) {
		if (!VALID_SORT_BY.includes(query.sort_by)) {
			return new UnprocessableContentError("Invalid sort query");
		}
	} else {
		query.sort_by = "timestamp";
	}
	if (query.order !== undefined) {
		query.order = query.order.toUpperCase();
		if (!VALID_ORDER.includes(query.order)) {
			return new UnprocessableContentError("Invalid order query");
		}
	} else {
		query.order = "DESC";
	}
	if (query.time !== undefined) {
		if (!VALID_TIME.includes(query.time)) {
			return new UnprocessableContentError("Invalid time query");
		}
	} else {
		query.time = "allTime";
	}

	return query;
}

export { validateTracesQuery };
