import { envs } from "./envs";

export const dbConfig = {
	url: envs.DATABASE_URL,
	user: envs.DB_USER,
	password: envs.DB_PASSWORD,
	host: envs.DB_HOST,
	port: envs.DB_PORT,
	database: envs.DB_DATABASE,
};
