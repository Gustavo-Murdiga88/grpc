import { styleText } from "node:util";
import { grpcServer } from "./grpc/server";
import { app } from "./http/server";

console.log(styleText("yellow", "Starting servers..."));
await grpcServer();
await app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
	console.log(styleText("green", "HTTP Server is running on port 3000 🚀🔥"));
});
