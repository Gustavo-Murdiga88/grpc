import { fastify } from "fastify";
import { getAllCustomersController } from "./controllers/customers/get-all-customers-controller";

const app = fastify();

app.register(getAllCustomersController);

export { app };
