import type { FastifyInstance } from "fastify";
import { client as grpc } from "../../../grpc/client";

interface ICreateStoreBody {
	name: string;
	addressId: string;
}

export async function createStoreController(app: FastifyInstance) {
	app.post("/store", async (req, reply) => {
		const { name, addressId } = req.body as ICreateStoreBody;
		const { promise, resolve } = Promise.withResolvers();
		grpc.createStore(
			{
				name,
				addressId,
			},
			(err, _response) => {
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
			},
		);

		return await promise;
	});
}
