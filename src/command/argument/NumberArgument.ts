import { Guild, Role, Message } from 'discord.js';
import Argument from './Argument';

export default class StringArgument extends Argument {
	public constructor(
		position: number,
		required: boolean = true,
		private max?: number
	) {
		super('string', position, required);
	}

	public parse(
		msg: Message,
		args: string[],
		guild: Guild
	): number | undefined {
		if (!args[this.position] && this.required) {
			throw new Error('No argument specified');
		} else if (!args[this.position] && !this.required) {
			return undefined;
		}
		let arg = args[this.position];
		if (isNaN(parseInt(arg))) {
			throw new Error('Argument specified is not a number');
		} else {
			let nArg = parseInt(arg);
			if (this.max && nArg > this.max) {
				throw new Error('Specified argument is too large');
			} else {
				return nArg;
			}
		}
	}
}
