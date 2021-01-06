import { GuildMember, Message } from 'discord.js';
import Bot from '../../Bot';
import CSVArgument from '../argument/CSVArgument';
import MemberArgument from '../argument/MemberArgument';
import StringArgument from '../argument/StringArgument';
import Command from '../Command';

export default class extends Command {
	public constructor() {
		super(
			'prefix',
			'Admin',
			['setprefix'],
			'A command to change the prefix of the bot',
			['prefix ??'],
			['ADMINISTRATOR'],
			[new StringArgument(0, true, 3)]
		);
	}

	public async execute(bot: Bot, msg: Message, args: string[]): Promise<any> {
		const prefix: string = this.arguments[0].parse(msg, args);
		bot.getCache().set(`guild.prefix.${msg.guild.id}`, prefix);
		return await msg.channel.send(`Set prefix to **${prefix}**`);
	}
}
