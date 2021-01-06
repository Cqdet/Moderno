import { GuildMember, Message } from 'discord.js';
import Bot from '../../Bot';
import CSVArgument from '../argument/CSVArgument';
import MemberArgument from '../argument/MemberArgument';
import StringArgument from '../argument/StringArgument';
import Command from '../Command';

export default class extends Command {
	public constructor() {
		super(
			'ping',
			'General',
			['pong', 'pung', 'pang'],
			'A command to test the latency of the bot',
			['ping']
		);
	}

	public async execute(bot: Bot, msg: Message, args: string[]): Promise<any> {
		const m = await msg.channel.send('Pinging...');
		const botPing = m.createdTimestamp - msg.createdTimestamp;
		const apiPing = bot.ws.ping;
		return await m.edit(
			`Bot Pong! \`${botPing}ms\`\nAPI Pong! \`${apiPing}ms\``
		);
	}
}
