import { styleText } from "node:util";
import { grpcServer } from "./grpc/server";

console.log(styleText("yellow", "GRPC Starting server..."));
await grpcServer();
