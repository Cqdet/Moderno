import { Message } from 'discord.js';

export default abstract class Argument {
	public name: string;
	public position: number;
	public required: boolean;

	constructor(name: string, position: number, required: boolean) {
		this.name = name;
		this.position = position;
		this.required = required;
	}

	public abstract parse(
		msg: Message,
		args: string[],
		...additional: unknown[]
	): any;
}
