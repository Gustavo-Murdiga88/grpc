import { z } from "zod";

const processEnvScheme = z.object({
	DATABASE_URL: z.url(),
	REDIS_URL: z.url(),
	GRPC_PORT: z.coerce.number().default(50001),
	GRPC_HOST: z.string().default("0.0.0.0"),
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_PORT: z.coerce.number(),
	DB_DATABASE: z.string(),
	DB_HOST: z.string().default("0.0.0.0"),
});

const processEnvs = processEnvScheme.safeParse(process.env);

if (!processEnvs.success) {
	throw new Error(
		`Invalid env variables: ${JSON.stringify(processEnvs.error.issues)}`,
	);
}

export const envs = processEnvs.data;
