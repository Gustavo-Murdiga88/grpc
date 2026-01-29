import { fastify } from "fastify";

import { createCustomerController } from "./controllers/customers/create-customer-controller";
import { getAllCustomersController } from "./controllers/customers/get-all-customers-controller";
import { healthController } from "./controllers/health/health";
import { metricsController } from "./controllers/health/metric";
import { createStoreController } from "./controllers/stores/create-store-controller";
import { getAllStoreController } from "./controllers/stores/get-all-stores-controller";

const app = fastify({
	logger: {
		name: "grpc_app",
		level: "info",
		transport: {
			targets: [
				{
					target: "pino-pretty",
					pipeline: [
						{
							target: "./transporters/pino.mjs",
							options: {
								destination: "./store/logs/grpc.log",
							},
						},
					],
					options: {
						labels: { job: "grpc_app" },
						colorize: true,
					},
				},
			],
		},
	},
});

app.register(getAllCustomersController);
app.register(getAllStoreController);
app.register(createCustomerController);
app.register(createStoreController);
app.register(metricsController);
app.register(healthController);

export { app };
