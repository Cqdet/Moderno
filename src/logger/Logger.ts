import chalk from 'chalk';
import moment from 'moment';

export default class Logger {
	public static DEBUG = false;

	private name: string;

	public constructor(name: string) {
		this.name = name.toUpperCase();
	}

	public debug(...args: any[]) {
		if (Logger.DEBUG)
			console.log(
				chalk.yellowBright(
					`[${moment().format()}] [${this.name}\\DEBUG]`,
					...args
				)
			);
	}

	public notice(...args: any[]) {
		console.log(
			chalk.blueBright(
				`[${moment().format()}] [${this.name}\\NOTICE]`,
				...args
			)
		);
	}

	public error(...args: any[]) {
		console.log(
			chalk.yellowBright(
				`[${moment().format()}] [${this.name}\\DEBUG]`,
				...args
			)
		);
	}
}
