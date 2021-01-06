'use strict';
import { token } from './config.json';
import Bot from './Bot';
import PingCommand from './command/commands/PingCommand';
import PrefixCommand from './command/commands/PrefixCommand';
import Logger from './logger/Logger';

const bot = new Bot(token, {});

bot.on('ready', async () => {
	Logger.DEBUG = true;
	await bot.getDB().init();
	console.log('Bot is ready', bot.user.tag);
	bot.getCommandHandler().register(new PingCommand()); // TODO: Add modular loading
	bot.getCommandHandler().register(new PrefixCommand());
});

bot.on('message', async (msg) => {
	let prefix: string = await new Promise((resolve, reject) => {
		bot.getCache().get(`guild.prefix.${msg.guild.id}`, (err, str) => {
			if (err) reject(err);
			console.log(str);
			return resolve(str as string);
		});
	});
	if (!prefix) {
		bot.getCache().set(`guild.prefix.${msg.guild.id}`, 'u!');
	} else {
		await bot.getCommandHandler().run(msg, prefix);
	}
});

bot.login(<string>bot.token);
