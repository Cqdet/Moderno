import { Guild, GuildMember, Message, User } from 'discord.js';
import Argument from './Argument';

export default class MemberArgument extends Argument {
	public constructor(position: number, required: boolean = true) {
		super('member', position, required);
	}

	public parse(
		msg: Message,
		args: string[],
		guild: Guild
	): GuildMember | undefined {
		if (!args[this.position] && this.required) {
			throw new Error('No member specified');
		} else if (!args[this.position] && !this.required) {
			return undefined;
		}
		const m: GuildMember | string =
			msg.mentions.members.first() || args[this.position];

		if (m instanceof GuildMember) {
			return m;
		} else {
			const member =
				guild.members.cache.find((member) => member.id === <string>m) ||
				guild.members.cache.find((member) =>
					member.nickname
						? member.nickname
								.toLowerCase()
								.startsWith((<string>m).toLowerCase())
						: member.user.username
								.toLowerCase()
								.startsWith((<string>m).toLowerCase())
				);
			if (!member) throw new Error('Cannot find specified member');
			return member;
		}
	}
}
