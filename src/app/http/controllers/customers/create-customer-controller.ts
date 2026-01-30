import type { FastifyInstance } from "fastify";
import service from "@/app/grpc/ioc/containers/services";
import { CreateCustomerRequest } from "@/grpc/stores_pb";

interface ICreateCustomerBody {
	name: string;
	age: number;
	addressId: string;
}

export async function createCustomerController(app: FastifyInstance) {
	app.post("/customer", async (req, reply) => {
		const { name, age, addressId } = req.body as ICreateCustomerBody;
		const { promise, resolve } = Promise.withResolvers();

		const createCustomerRequest = new CreateCustomerRequest()
			.setName(name)
			.setAddressId(addressId)
			.setAge(age);

		service.store.createCustomer(createCustomerRequest, (err) => {
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
		});

		return await promise;
	});
}
