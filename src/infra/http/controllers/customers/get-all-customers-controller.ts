import type { FastifyInstance } from "fastify";
import { client as grpc } from "../../../grpc/client";

export async function getAllCustomersController(app: FastifyInstance) {
	app.get("/customers", async (_, reply) => {
		const { promise, resolve } = Promise.withResolvers();
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
