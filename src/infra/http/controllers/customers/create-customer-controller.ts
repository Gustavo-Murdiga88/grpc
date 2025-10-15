import type { FastifyInstance } from "fastify";
import { client as grpc } from "../../../grpc/client";

interface ICreateCustomerBody {
	name: string;
	age: number;
	addressId: string;
}

export async function createCustomerController(app: FastifyInstance) {
	app.post("/customer", async (req, reply) => {
		const { name, age, addressId } = req.body as ICreateCustomerBody;
		const { promise, resolve } = Promise.withResolvers();
		grpc.createCustomer(
			{
				name,
				age,
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
						message: "Customer created successfully",
					}),
				);
			},
		);

		return await promise;
	});
}
