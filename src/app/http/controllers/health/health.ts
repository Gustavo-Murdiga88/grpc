import type { FastifyInstance } from "fastify";
import promClient from "prom-client";

promClient.collectDefaultMetrics();
promClient.register.setDefaultLabels({ service: "grpc_app" });

export async function healthController(app: FastifyInstance) {
	app.get("/health", async (req, reply) => {
		req.log.info("Health check endpoint called");

		return reply.status(200).send({ status: "ok" });
	});
}
