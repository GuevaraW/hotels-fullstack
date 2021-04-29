import { Hotel } from 'src/types';
import { Service, Container } from 'typedi';
import { Logger } from 'winston';
import { ErrorHandler } from '../helpers/ErrorHandler';

@Service()
export default class HotelService {
	constructor() {}

	filterBy(key: string, value: unknown, repo: Array<Hotel>) {
		const valueSanit = typeof value === 'string' ? value.replace('+', ' ') : value;
		const filtered = repo.filter((hotel) => {
			return hotel[key] === valueSanit;
		});
		if (filtered[key]) return filtered;
		throw new ErrorHandler(404, 'Not Found');
	}
}
