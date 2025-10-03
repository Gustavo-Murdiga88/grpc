import { fastify } from "fastify";
import { client } from "../grpc/client.ts";

const app = fastify();

app.get("/hello", (_request, _reply) => {
	client.sayHello({ name: "oi" }, (err, response) => {
		if (err) {
			console.log("[err]", err.metadata.toJSON());
		} else {
			console.log(`[client]: ${response?.message}`);
		}
	});
});

export { app };
