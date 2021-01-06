import { Message, Guild } from 'discord.js';
import Argument from './Argument';

export default class FlagArgument extends Argument {
	public constructor(position: number, required: boolean = true) {
		super('flag', position, required);
	}

	public parse(
		msg: Message,
		args: string[],
		guild: Guild
	): { name: string; value: string[] }[] {
		const list = args.slice(this.position);
		const flags: { name: string; value: string[] }[] = [];
		let tmp = '';
		for (let i of list) {
			if (i.startsWith('-')) {
				tmp = i;
				i = i.split('-')[1];
				flags.push({ name: i, value: [] });
			} else {
				let flag = flags.find((f) => f.name === tmp.split('-')[1]);
				if (!flag) continue;
				flag.value.push(i);
			}
		}

		return flags;
	}
}
