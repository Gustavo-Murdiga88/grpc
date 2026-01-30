import { styleText } from "node:util";
import * as grpc from "@grpc/grpc-js";
import config from "@/config/client";
import { StoresServiceService } from "@/grpc/stores_grpc_pb";
import * as containers from "./ioc";

async function grpcServer() {
	const { resolve, reject, promise } = Promise.withResolvers<boolean | Error>();
	const server = new grpc.Server();

	server.addService(StoresServiceService, containers.handlers.store);

	const route = `${config.store.host}:${config.store.port}`;
	server.bindAsync(
		route,
		grpc.ServerCredentials.createInsecure(),
		(err, _port) => {
			if (err) {
				console.error("Error starting gRPC server:", err);
				reject(err);
				return;
			}
			console.log(styleText("green", `gRPC server running at ${route} 🚀🔥`));
			resolve(true);
		},
	);

	await promise;
}

export { grpcServer };
