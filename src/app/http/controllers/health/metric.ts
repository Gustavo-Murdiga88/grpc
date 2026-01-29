import type { FastifyInstance } from "fastify";
import promClient from "prom-client";

promClient.collectDefaultMetrics();
promClient.register.setDefaultLabels({ service: "grpc_app" });

export async function metricsController(app: FastifyInstance) {
	app.get("/metrics", async (_, reply) => {
		reply.header("content-type", promClient.contentType);
		const metrics = await promClient.register.metrics();
		return reply.send(metrics);
	});
}
