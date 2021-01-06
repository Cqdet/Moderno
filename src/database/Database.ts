import sqlite3 from 'sqlite3';
import Logger from '../logger/Logger';

export default class Database extends sqlite3.Database {
	private logger: Logger = new Logger('database');

	public constructor(fileName: string = './src/resources/bot.db') {
		super(fileName);
	}

	public async init() {
		await this.execute(
			'create table if not exists guilds (id varchar(18) not null unique, prefix varchar(3));'
		);
		this.logger.debug('Successfully executed database start script');
	}

	public async query(sql: string): Promise<unknown> {
		return new Promise((resolve, reject) => {
			super.each(sql, (err, row) => {
				if (err) reject(err);
				this.logger.debug('Successful SQL Query', sql);
				resolve(row as unknown);
			});
		});
	}

	public async execute(sql: string): Promise<void> {
		return new Promise((resolve, reject) => {
			super.exec(sql, (err) => {
				if (err) reject(err);
				this.logger.debug('Successful SQL Query', sql);
				void resolve();
			});
		});
	}
}
