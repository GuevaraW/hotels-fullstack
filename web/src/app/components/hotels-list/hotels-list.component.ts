import { Component, OnInit } from '@angular/core';
import { ListHotels } from 'src/app/models/Hotel';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss'],
})
export class HotelsListComponent implements OnInit {
  hotels: ListHotels = [];

  constructor(public hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService
      .getHotels('http://localhost:3000/api/hotels')
      .subscribe((data) => {
        this.hotels = data;
      });
  }
}
