import { Pool } from "pg";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;

const ENV = process.env.NODE_ENV || "development";

dotenv.config({ path: `${__dirname}/../.env.${ENV}`, quiet: true });

const config = {};

if (ENV === "production") {
	config.connectionString = process.env.DATABASE_URL;
	config.max = 2;
}

const db = new Pool(config);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
	throw new Error("No PGDATABASE configured or DATABASE_URL not set");
} else {
	console.log(
		`Connected to ${process.env.PGDATABASE || process.env.DATABASE_URL}`,
	);
}

export default db;
