import { Guild, Message } from 'discord.js';
import Argument from './Argument';

export default class CSVArgument extends Argument {
	public constructor(position: number, required: boolean = true) {
		super('csv', position, required);
	}

	public parse(
		msg: Message,
		args: string[],
		guild: Guild
	): string[] | undefined {
		if (!args[this.position] && this.required) {
			throw new Error('List not specified');
		} else if (!args[this.position] && !this.required) {
			return undefined;
		}

		const list = args.join(' ').split(', ');

		list[list.length - 1] = list[list.length - 1].split(' ')[0]; // Case with FlagArguments
		return list;
	}
}
