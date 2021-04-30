import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../../models/Hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  @Input()
  hotel!: Hotel;

  constructor() {}

  ngOnInit(): void {}
}
