import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "./prisma",
	migrations: {
		seed: "dotenv -e .env -- pnpm tsx ./prisma/seed.ts",
		path: "./prisma/migrations",
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
});
