import type { FastifyInstance } from "fastify";
import service from "@/app/grpc/ioc/containers/services";
import { Void } from "@/grpc/stores_pb";

export async function getAllCustomersController(app: FastifyInstance) {
	app.get("/customers", async (_, reply) => {
		const { promise, resolve } = Promise.withResolvers();
		app.log.info({ ctx: "teste" }, "Logging inside getAllCustomersController");

		service.store.listCustomers(new Void(), (err, data) => {
			if (err) {
				resolve(
					reply.status(err.code).send({
						error: err.message,
					}),
				);
				return;
			}

			const customers = data.toObject();

			resolve(
				reply.send({
					customers: customers.customersList,
				}),
			);
		});

		return await promise;
	});
}
