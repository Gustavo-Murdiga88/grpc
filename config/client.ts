import { envs } from "./envs"

export default {
  store: {
    host: envs.GRPC_HOST,
    port: envs.GRPC_PORT,
  }
}