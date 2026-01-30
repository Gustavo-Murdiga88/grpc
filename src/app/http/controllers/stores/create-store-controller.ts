import type { FastifyInstance } from "fastify";
import service from "@/app/grpc/ioc/containers/services";
import { CreateStoreRequest } from "@/grpc/stores_pb";

interface ICreateStoreBody {
	name: string;
	addressId: string;
}

export async function createStoreController(app: FastifyInstance) {
	app.post("/store", async (req, reply) => {
		const { name, addressId } = req.body as ICreateStoreBody;
		const { promise, resolve } = Promise.withResolvers();

		const createCustomerRequest = new CreateStoreRequest();

		createCustomerRequest.setName(name);
		createCustomerRequest.setAddressId(addressId);
		service.store.createStore(createCustomerRequest, (err) => {
			if (err) {
				resolve(
					reply.status(err.code).send({
						error: err.message,
					}),
				);
				return;
			}

			resolve(
				reply.status(201).send({
					message: "Store created successfully",
				}),
			);
		});

		return await promise;
	});
}
