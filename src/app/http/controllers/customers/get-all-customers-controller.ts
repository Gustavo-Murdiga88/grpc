import type { FastifyInstance } from "fastify";
import { client as grpc } from "../../../../app/grpc/client";

export async function getAllCustomersController(app: FastifyInstance) {
	app.get("/customers", async (_, reply) => {
		const { promise, resolve } = Promise.withResolvers();
		app.log.info({ ctx: "teste" }, "Logging inside getAllCustomersController");

		grpc.listCustomers(_, (err, response) => {
			if (err) {
				resolve(
					reply.status(err.code).send({
						error: err.message,
					}),
				);
				return;
			}

			resolve(
				reply.send({
					customers: response?.customers || [],
				}),
			);
		});

		return await promise;
	});
}
