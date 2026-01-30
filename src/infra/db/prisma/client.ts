import { styleText } from "node:util";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import * as config from "../../../../config";

class Client extends PrismaClient {
	protected constructor() {
		super({
			log: ["error", "query"],
			errorFormat: "pretty",
			transactionOptions: {
				maxWait: 5 * 1000, // 5 seconds,
				timeout: 10 * 1000, // 10 seconds
			},
			adapter: new PrismaPg({
				host: config.dbConfig.host,
				port: config.dbConfig.port,
				database: config.dbConfig.database,
				user: config.dbConfig.user,
				password: config.dbConfig.password,
			}),
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
