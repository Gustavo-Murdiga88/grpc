import type { FastifyInstance } from "fastify";
import service from "@/app/grpc/ioc/containers/services";
import { Void } from "@/grpc/stores_pb";

export async function getAllStoreController(app: FastifyInstance) {
	app.get("/stores", async (_, reply) => {
		return new Promise((resolve) => {
			const listStoreRequest = new Void();

			service.store.listStores(listStoreRequest, (err, data) => {
				if (err) {
					return resolve(
						reply.status(500).send({
							error: err.message,
						}),
					);
				}

				const stores = data?.toObject();

				resolve(
					reply.send({
						stores: stores.storesList,
					}),
				);
			});
		});
	});
}
