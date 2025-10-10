import type { FastifyInstance } from "fastify";
import { client as grpc } from "../../../grpc/client";

export async function getAllCustomersController(app: FastifyInstance) {
	app.get("/customers", async (_, reply) => {
		grpc.sayHello({ name: "Gustavo" }, (err, response) => {
			if (err) {
				return reply.status(err.code).send({
					error: err.message,
				});
			}

			return reply.send({
				customers: !response?.message ? [] : JSON.parse(response.message),
			});
		});
	});
}
