import { Client, ClientOptions } from 'discord.js';
import { RedisClient, createClient } from 'redis';
import CommandHandler from './command/CommandHandler';
import Database from './database/Database';

export default class Bot extends Client {
	private commandHandler: CommandHandler;
	private db: Database;
	private cache: RedisClient;
	private voiceQueue: Map<string, string>;

	constructor(token: string, options: ClientOptions) {
		super(options);
		this.token = token;
		this.commandHandler = new CommandHandler(this);
		this.db = new Database();
		this.cache = createClient();
		this.voiceQueue = new Map<string, string>();
	}

	public getCommandHandler(): CommandHandler {
		return this.commandHandler;
	}

	getDB(): Database {
		return this.db;
	}

	getCache(): RedisClient {
		return this.cache;
	}

	getVoiceQueue(): Map<string, string> {
		return this.voiceQueue;
	}
}
