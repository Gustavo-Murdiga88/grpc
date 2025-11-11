import { resolve } from "node:path";
import * as grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import type { ProtoGrpcType } from "../../../proto-gen/stores";
import containers from "./containers";

const pathToProto = resolve(process.cwd(), "prototypes/stores.proto");
const definition = loadSync(pathToProto);
const storesService = grpc.loadPackageDefinition(
	definition,
) as unknown as ProtoGrpcType;

async function grpcServer() {
	const { resolve, reject, promise } = Promise.withResolvers<boolean | Error>();
	const server = new grpc.Server();

	server.addService(storesService.stores.StoresService.service, containers.handlers );

	server.bindAsync(
		"0.0.0.0:50051",
		grpc.ServerCredentials.createInsecure(),
		(err, port) => {
			if (err) {
				console.error("Error starting gRPC server:", err);
				reject(err);
				return;
			}
			console.log(`gRPC server running at http://0.0.0.0:${port}`);
			resolve(true);
		},
	);

	await promise;
}

export { grpcServer };
