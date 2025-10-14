import { resolve } from "node:path";
import * as grpc from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import type { ProtoGrpcType } from "../../../proto-gen/stores";

const pathToProto = resolve(process.cwd(), "prototypes/stores.proto");
const definition = loadSync(pathToProto);
const storeService = grpc.loadPackageDefinition(
	definition,
) as unknown as ProtoGrpcType;

const client = new storeService.stores.StoresService(
	"0.0.0.0:50051",
	grpc.credentials.createInsecure(),
	{
		"grpc.service_config": JSON.stringify({
			methodConfig: [
				{
					name: [{ service: "hello.Greeter", method: "SayHello" }],
					timeout: "60s",
					retryPolicy: {
						maxAttempts: 12,
						initialBackoff: "1s",
						maxBackoff: "60s",
						backoffMultiplier: 1,
						retryableStatusCodes: [14, 5],
					},
				},
			],
		}),
	},
);

export { client };
