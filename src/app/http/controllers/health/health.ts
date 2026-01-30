import type { FastifyInstance } from "fastify";

export async function healthController(app: FastifyInstance) {
	app.get("/health", async (req, reply) => {
		req.log.info("Health check endpoint called");

		return reply.status(200).send({ status: "ok" });
	});
}
