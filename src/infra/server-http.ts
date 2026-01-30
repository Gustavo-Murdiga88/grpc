import { app } from "@/app/http/server";

(async () => {
	await app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
		app.log.info("HTTP Server is running on port 3000 🚀🔥");
	});
})();
