import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListHotels, Hotel } from 'src/app/models/Hotel';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  hotel!: Hotel;

  constructor(
    private route: ActivatedRoute,
    public hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.getHotelDetails();
  }

  getHotelDetails() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.hotelService.getHotelById(id).subscribe((data: ListHotels) => {
      this.hotel = data[0];
    });
  }
}
