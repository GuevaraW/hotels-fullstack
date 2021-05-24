import { HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { ListHotels } from '../../models/Hotel';
import { fromEvent, Subscription } from 'rxjs';
import { HotelService } from '../../services/hotel.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements AfterViewInit {
  @ViewChild('searchBox')
  searchBox!: ElementRef;

  @Output('onFilter')
  onFilter = new EventEmitter<ListHotels>();

  params: HttpParams = new HttpParams();
  private subscription!: Subscription;
  isMenuCollapsed = true;
  rate: number = 0;
  stars: number = 0;

  constructor(public hotelService: HotelService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const search$ = fromEvent<any>(this.searchBox.nativeElement, 'keyup').pipe(
      debounceTime(600),
      distinctUntilChanged(),
      map(
        (text) =>
          (this.params = text.target.value.length
            ? this.params.set('search', text.target.value)
            : this.params.delete('search'))
      ),
      startWith('')
    );
    this.subscription = search$.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters() {
    this.hotelService
      .getHoltels(this.params)
      .subscribe((data) => this.onFilter.emit(data));
  }

  searchFilter(text: string) {
    this.params = text.length
      ? this.params.set('search', text)
      : this.params.delete('search');
  }

  filterClear(
    search: HTMLInputElement,
    min: HTMLInputElement,
    max: HTMLInputElement
  ) {
    this.params
      .keys()
      .forEach((param) => (this.params = this.params.delete(param)));
    this.rate = 0;
    this.stars = 0;
    search.value = '';
    min.value = '';
    max.value = '';
    this.applyFilters();
  }
}
