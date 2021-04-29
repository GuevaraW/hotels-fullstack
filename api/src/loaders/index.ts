import { Container } from 'typedi';
import expressLoader from './express';
import Logger from '../helpers/Logger';
import { Application } from 'express';

export default async (app: Application): Promise<void> => {
	Container.set('logger', Logger);
	try {
	} catch (err) {
		throw err;
	}

	expressLoader(app);
	Logger.info('Express loaded!');
};
