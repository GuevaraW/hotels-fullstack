import { Router, Request, Response, NextFunction } from 'express';
import readJson from '../helpers/ReadJson';
import path from 'path';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { ListHotels } from '../types';
import HotelService from '../services/hotels.service';

const route = Router();
const jsonPath = path.resolve(__dirname, '../database/hotels.json');

route
	.get('/', (req: Request, res: Response, next: NextFunction) => {
		const logger: Logger = Container.get('logger');
		logger.debug('Calling GET to /hotels endpoint');
		const buffer = JSON.parse(readJson(jsonPath));
		try {
			res.json(buffer).status(200);
		} catch (error) {
			next(error);
		}
	})
	.get('/id/:id', (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const logger: Logger = Container.get('logger');
		logger.debug(`Calling GET to /hotels/${id} endpoint`);

		try {
			const buffer: ListHotels = JSON.parse(readJson(jsonPath));
			const hotelServices = Container.get(HotelService);
			const filtered = hotelServices.filterBy('id', id, buffer);

			res.json(filtered).status(200);
		} catch (error) {
			next(error);
		}
	})
	.get('/name/:name', (req: Request, res: Response, next: NextFunction) => {
		const { name } = req.params;
		const logger: Logger = Container.get('logger');
		logger.debug(`Calling GET to /hotels/${name} endpoint`);

		try {
			const buffer: ListHotels = JSON.parse(readJson(jsonPath));
			const hotelServices = Container.get(HotelService);
			const filtered = hotelServices.filterBy('name', name, buffer);

			res.json(filtered).status(200);
		} catch (error) {
			next(error);
		}
	})
	.get('/city/:city', (req: Request, res: Response, next: NextFunction) => {
		const { city } = req.params;
		const logger: Logger = Container.get('logger');
		logger.debug(`Calling GET to /hotels/${city} endpoint`);

		try {
			const buffer: ListHotels = JSON.parse(readJson(jsonPath));
			const hotelServices = Container.get(HotelService);
			const filtered = hotelServices.filterBy('city', city, buffer);

			res.json(filtered).status(200);
		} catch (error) {
			next(error);
		}
	})
	.get('/country/:country', (req: Request, res: Response, next: NextFunction) => {
		const { country } = req.params;
		const logger: Logger = Container.get('logger');
		logger.debug(`Calling GET to /hotels/:${country} endpoint`);

		try {
			const buffer: ListHotels = JSON.parse(readJson(jsonPath));
			const hotelServices = Container.get(HotelService);
			const filtered = hotelServices.filterBy('country', country, buffer);

			res.json(filtered).status(200);
		} catch (error) {
			next(error);
		}
	})
	.get('/stars/:stars', (req: Request, res: Response, next: NextFunction) => {
		const { stars } = req.params;
		const logger: Logger = Container.get('logger');
		logger.debug(`Calling GET to /hotels/:${stars} endpoint`);

		try {
			const buffer: ListHotels = JSON.parse(readJson(jsonPath));
			const hotelServices = Container.get(HotelService);
			const filtered = hotelServices.filterBy('stars', stars, buffer);

			res.json(filtered).status(200);
		} catch (error) {
			next(error);
		}
	});

export default route;
