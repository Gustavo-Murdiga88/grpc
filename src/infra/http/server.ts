import { fastify } from "fastify";
import { createCustomerController } from "./controllers/customers/create-customer-controller";
import { getAllCustomersController } from "./controllers/customers/get-all-customers-controller";
import { createStoreController } from "./controllers/stores/create-store-controller";
import { getAllStoreController } from "./controllers/stores/get-all-stores-controller";

const app = fastify();

app.register(getAllCustomersController);
app.register(getAllStoreController);
app.register(createCustomerController);
app.register(createStoreController);

export { app };
