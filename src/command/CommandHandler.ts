import { Message } from 'discord.js';
import Bot from '../Bot';
import Command from './Command';

export default class CommandHandler {
	private bot: Bot;
	private commands: Map<string, Command>;

	public constructor(bot: Bot, commands?: Command[]) {
		this.bot = bot;
		this.commands = new Map<string, Command>();
		if (commands) {
			for (let command of commands) {
				this.commands.set(command.name, command);
				if (command.aliases) {
					for (let alias of command.aliases) {
						this.commands.set(alias, command);
					}
				}
			}
		}
	}

	public async run(msg: Message, prefix: string): Promise<void> {
		let args = msg.content.slice(prefix.length).trim().split(/ +/g);
		let name = args.shift();
		let command = [...this.commands.values()].find(
			(c) => c.name === name || c.aliases.includes(name)
		);
		if (!command) return;
		if (command.permissions && command.permissions.length > 0) {
			if (
				!msg.member.hasPermission(command.permissions) &&
				!msg.member.hasPermission('ADMINISTRATOR')
			) {
				return await command.noPermissions(msg, command.permissions);
			}
		}

		try {
			await command.execute(this.bot, msg, args);
		} catch (err) {
			console.log(err);
			await command.error(msg, { code: '101', message: err.message });
		}
	}

	public register(command: Command) {
		this.commands.set(command.name, command);
		if (command.aliases) {
			for (let alias of command.aliases) {
				this.commands.set(alias, command);
			}
		}
	}

	public unregister(command: Command | string) {
		if (command instanceof Command) {
			this.commands.delete(command.name);
			if (command.aliases) {
				for (let alias of command.aliases) {
					this.commands.delete(alias);
				}
			}
		} else {
			let __command = [...this.commands.values()].find(
				(c) => c.name === command
			);
			this.commands.delete(__command.name);
			if (__command.aliases) {
				for (let alias of __command.aliases) {
					this.commands.delete(alias);
				}
			}
		}
	}
}
