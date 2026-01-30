import * as grpc from "@grpc/grpc-js";
import config from "@/config/client";
import { StoresServiceClient } from "@/grpc/stores_grpc_pb";

export default {
	store: new StoresServiceClient(
		`${config.store.host}:${config.store.port}`,
		grpc.credentials.createInsecure(),
	),
};
