import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ListHotels } from 'src/app/models/Hotel';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss'],
})
export class HotelsListComponent implements OnInit {
  hotels: ListHotels = [];
  hotelSubject = new Subject<any>();

  constructor(public hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelSubject.subscribe((data) => {
      this.hotels = data;
    });
  }
}
