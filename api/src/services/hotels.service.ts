import { Hotel, ListHotels } from 'src/types';
import { Service } from 'typedi';

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
	}

	filter(filters: object, repo: ListHotels): ListHotels {
		const filtered = repo.filter((hotel: Hotel) => {
			return this.matchToHotel(hotel, filters);
		});

		return filtered.length ? filtered : [];
	}

	private filterDictionary = {
		search: (acc: any, filters: object, key: string, hotel: Hotel) =>
			acc && this.findString(filters[key], hotel.name, hotel.city, hotel.country),
		min: (acc: any, filters: object, key: string, hotel: Hotel) => acc && hotel.price >= filters[key],
		max: (acc: any, filters: object, key: string, hotel: Hotel) => acc && hotel.price <= filters[key],
		stars: (acc: any, filters: object, key: string, hotel: Hotel) => acc && hotel.stars == filters[key],
		rating: (acc: any, filters: object, key: string, hotel: Hotel) => acc && Math.round(hotel.rating) == filters[key],
	};

	private matchToHotel(hotel: Hotel, filters: object): boolean {
		const keys = Object.keys(filters);
		return keys.reduce((acc: boolean, key: string) => {
			acc = this.filterDictionary[key](acc, filters, key, hotel);
			return acc;
		}, true);
	}

	private findString(searchString: string, ...values: string[]): boolean {
		searchString = this.normalizeString(searchString);

		return values.slice(0).reduce((found: boolean, value, i, arr) => {
			const str = this.normalizeString(value);

			found = str.includes(searchString) ? true : false;
			found ? arr.splice(i) : null; //short circuit reduce

			return found;
		}, false);
	}

	private normalizeString(string: string) {
		return string
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace('+', ' ');
	}
}
