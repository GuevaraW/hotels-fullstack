import { Component, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListHotels } from 'src/app/models/Hotel';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  isMenuCollapsed = true;
  data: ListHotels = [];
  search = '';
  rate: number = 4;
  stars: number = 4;

  constructor(public hotelService: HotelService) {}

  ngOnInit(): void {}

  searchFilter(text: string) {
    let byName = this.hotelService.filterHotelsByName(text);
    let byCity = this.hotelService.filterHotelsByCity(text);
    let byCountry = this.hotelService.filterHotelsByCountry(text);

    forkJoin([byName, byCity, byCountry])
      .pipe(
        map((data) => {
          let hash: { [key: string]: any } = {};
          return data.reduce((acc, item) => {
            item.forEach((hotel) => {
              const { id } = hotel;
              hash[id] ? acc : acc.push(hotel);
              hash = { ...hash, [id]: true };
            });
            return acc;
          }, []);
        })
      )
      .subscribe((data) => console.log(data));
  }
  priceFilter(minValue: string, maxValue: string) {
    let minPrice: number | string = parseInt(minValue),
      maxPrice: number | string = parseInt(maxValue);
    isNaN(minPrice) ? (minPrice = '') : (minPrice = minValue);
    isNaN(maxPrice) ? (maxPrice = '') : (maxPrice = maxValue);

    this.hotelService
      .filterHotelsByPrice(minPrice, maxPrice)
      .subscribe((data) => console.log(data));
  }
  rateFilter(rating: number) {
    this.hotelService
      .filterHotelsByStars(rating)
      .subscribe((data) => console.log(data));
  }
  starsFilter(stars: number) {
    this.hotelService
      .filterHotelsByStars(stars)
      .subscribe((data) => console.log(data));
  }
}
