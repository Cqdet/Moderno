import {
	BitFieldResolvable,
	Message,
	MessageEmbed,
	PermissionString,
} from 'discord.js';
import Bot from '../Bot';
import Argument from './argument/Argument';

export interface CommandError {
	code: string;
	message: string;
}

export default abstract class Command {
	public name: string;
	public module: string;
	public aliases?: string[];
	public description: string;
	public usage: string | string[];
	public permissions?: BitFieldResolvable<PermissionString>[];
	public arguments?: Argument[];

	public constructor(
		name: string,
		module: string,
		aliases: string[] = [],
		description: string,
		usage: string | string[],
		permissions?: BitFieldResolvable<PermissionString>[],
		_arguments?: Argument[]
	) {
		this.name = name;
		this.module = module;
		this.aliases = aliases;
		this.description = description;
		this.usage = usage;
		this.permissions = permissions;
		this.arguments = _arguments;
	}

	public abstract execute(
		bot: Bot,
		msg: Message,
		args: string[]
	): Promise<any>;

	public async error(msg: Message, err: CommandError): Promise<void> {
		msg.channel.send(
			new MessageEmbed()
				.setTitle('Command Error')
				.setColor('RED')
				.addField('Error Code:', err.code)
				.addField('Message:', err.message)
		);
	}
	public async noPermissions(
		msg: Message,
		permissions: BitFieldResolvable<PermissionString>[]
	) {
		console.log('No perms');
	}
}
