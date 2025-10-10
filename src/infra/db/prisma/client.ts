import { styleText } from "node:util";
import { PrismaClient } from "@prisma/client";

class Client extends PrismaClient {
	protected constructor() {
		super({
			log: ["error", "query"],
			errorFormat: "pretty",
			transactionOptions: {
				maxWait: 5 * 1000, // 5 seconds,
				timeout: 10 * 1000, // 10 seconds
			},
		});
	}

	private static instance: Client;
	static getInstance() {
		console.log(
			styleText("yellow", `Getting instance of PrismaClient, ${Client.name}`),
		);

		if (!Client.instance) {
			Client.instance = new Client();
			return Client.instance;
		}

		return Client.instance;
	}
}

export const client = Client.getInstance();
