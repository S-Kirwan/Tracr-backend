import app from "./app.js";

const portNumber = 9090;
const { PORT = portNumber } = process.env;

app.listen(PORT, () => {
	console.log(`Tracr server listening on port ${portNumber}`);
});
