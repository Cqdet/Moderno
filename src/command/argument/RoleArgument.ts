import { Guild, Role, Message } from 'discord.js';
import Argument from './Argument';

export default class RoleArgument extends Argument {
	public constructor(position: number, required: boolean = true) {
		super('role', position, required);
	}

	public parse(msg: Message, args: string[], guild: Guild): Role | undefined {
		if (!args[this.position] && this.required) {
			throw new Error('No role specified');
		} else if (!args[this.position] && !this.required) {
			return undefined;
		}
		const m = msg.mentions.roles.first().id || args[this.position];

		const role =
			guild.roles.cache.get(m) ||
			guild.roles.cache.find((role) => role.id === <string>m) ||
			guild.roles.cache.find((role) =>
				role.name.toLowerCase().startsWith((<string>m).toLowerCase())
			);

		if (!role && this.required)
			throw new Error('Cannot find specified role');

		return role;
	}
}
