import { Hotel, ListHotels } from 'src/types';
import { Service } from 'typedi';
import { ErrorHandler } from '../helpers/ErrorHandler';

@Service()
export default class HotelService {
	constructor() {}

	filterBy(key: string, value: string, repo: ListHotels): ListHotels {
		const filtered = repo.filter((hotel: Hotel) => {
			let field = hotel[key];
			if (typeof field === 'string') {
				return this.findString(field, value);
			}
			if (typeof field === 'number') {
				return field.toString() === value;
			}
		});

		if (filtered.length) {
			return filtered;
		}
		return [];
		// throw new ErrorHandler(404, 'Not Found');
	}

	filterByRange(key: string, min: any, max: any, repo: ListHotels): ListHotels {
		const filtered = repo.filter((hotel: Hotel) => {
			let field = parseInt(hotel[key]);
			if (!min && max) return field <= parseInt(max);
			if (min && !max) return field >= parseInt(min);
			if (min && max) return field >= parseInt(min) && field <= parseInt(max);
			return true;
		});

		if (filtered.length) return filtered;
		return [];
		// throw new ErrorHandler(404, 'Not Found');
	}

	private findString(string: string, searchString: string): boolean {
		searchString = this.normalizeString(searchString);
		const str = this.normalizeString(string);
		return str.includes(searchString);
	}

	private normalizeString(string: string) {
		return string
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace('+', ' ');
	}
}
