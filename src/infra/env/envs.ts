import { z } from "zod";

const processEnvScheme = z.object({
	DATABASE_URL: z.url(),
	REDIS_URL: z.url(),
});

const processEnvs = processEnvScheme.safeParse(process.env);

if (!processEnvs.success) {
	throw new Error(
		`Invalid env variables: ${JSON.stringify(processEnvs.error.issues)}`,
	);
}

export const envs = processEnvs.data;
