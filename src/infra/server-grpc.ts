import { styleText } from "node:util";
import { grpcServer } from "../app/grpc/server";

console.log(styleText("yellow", "GRPC Starting server..."));
await grpcServer();
