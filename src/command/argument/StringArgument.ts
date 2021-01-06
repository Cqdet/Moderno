import { Guild, Role, Message } from 'discord.js';
import Argument from './Argument';

export default class StringArgument extends Argument {
	public constructor(
		position: number,
		required: boolean = true,
		private maxLength?: number
	) {
		super('string', position, required);
	}

	public parse(
		msg: Message,
		args: string[],
		guild: Guild
	): string | undefined {
		if (!args[this.position] && this.required) {
			throw new Error('No argument specified');
		} else if (!args[this.position] && !this.required) {
			return undefined;
		}
		let arg = args[this.position];
		if (this.maxLength && arg.length > this.maxLength) {
			throw new Error('Argument specified is too large');
		} else {
			return arg;
		}
	}
}
