import { styleText } from "node:util";
import { app } from "./http/server";

console.log(styleText("yellow", "HTTP Starting server..."));
await app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
	console.log(styleText("green", "HTTP Server is running on port 3000 🚀🔥"));
});
