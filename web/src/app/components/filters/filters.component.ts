import { Component, OnInit } from '@angular/core';
import 'bootstrap';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isMenuCollapsed = true;
  rate: number = 4;
}
