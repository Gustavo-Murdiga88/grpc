import { grpcServer } from "./grpc/server";
import { app } from "./http/server";

await grpcServer();
await app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
	console.log("HTTP Server is running on port 3000 🚀🔥");
});
