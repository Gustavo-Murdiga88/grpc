import { grpcServer } from "./grpc/server.ts";
import { app } from "./http/server.ts";

await grpcServer();
await app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
	console.log("HTTP Server is running on port 3000 🚀🔥");
});
