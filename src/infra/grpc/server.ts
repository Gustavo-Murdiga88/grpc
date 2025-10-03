import { resolve } from "node:path";
import * as grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import type { ProtoGrpcType } from "../../../proto-gen/hello";
import type { GreeterHandlers } from "../../../proto-gen/hello/Greeter";

const pathToProto = resolve(process.cwd(), "prototypes/hello.proto");
const definition = loadSync(pathToProto);
const helloWord = grpc.loadPackageDefinition(
	definition,
) as unknown as ProtoGrpcType;

async function grpcServer() {
	const { resolve, reject, promise } = Promise.withResolvers<boolean | Error>();
	const server = new grpc.Server();

	server.addService(helloWord.hello.Greeter.service, {
		sayHello: async (_call, callback) => {
			callback(null, { message: "Hello from gRPC server!" });
		},
	} satisfies GreeterHandlers);

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
