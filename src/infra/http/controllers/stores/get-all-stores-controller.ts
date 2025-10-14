import type { FastifyInstance } from "fastify";
import { client as grpc } from "../../../grpc/client";

export async function getAllStoreController(app: FastifyInstance) {
	app.get("/stores", async (_, reply) => {
		return new Promise((resolve) => {
			grpc.listStores(_, (err, response) => {
				if (err) {
					return resolve(
						reply.status(500).send({
							error: err.message,
						}),
					);
				}

				resolve(
					reply.send({
						customers: response?.stores || [],
					}),
				);
			});
		});
	});
}
