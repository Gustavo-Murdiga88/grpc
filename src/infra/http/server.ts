import { fastify } from "fastify";
import { getAllCustomersController } from "./controllers/customers/get-all-customers-controller";
import { getAllStoreController } from "./controllers/stores/get-all-stores-controller";

const app = fastify();

app.register(getAllCustomersController);
app.register(getAllStoreController);

export { app };
