import * as grpc from "@grpc/grpc-js";
import { StoresServiceClient } from "@grpc/stores_grpc_pb";

const client = new StoresServiceClient(
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

export default { client };
