import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ListHotels } from '../models/Hotel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  urlBase = 'http://localhost:3000/api/hotels';

  constructor(private router: Router, private http: HttpClient) {}

  getHotels(): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(this.urlBase)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  getHotelById(id: string): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/id/${id}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  filterHotelsByName(name: string): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/name/${name}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  filterHotelsByCity(city: string): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/city/${city}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  filterHotelsByCountry(country: string): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/country/${country}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  filterHotelsByStars(stars: number): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/stars/${stars}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  filterHotelsByRating(rating: number): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/rating/${rating}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  filterHotelsByPrice(
    min: number | string,
    max: number | string
  ): Observable<ListHotels> {
    return this.http
      .get<ListHotels>(`${this.urlBase}/price/?min=${min}&max=${max}`)
      .pipe(catchError((error) => this.handleErrors(error)));
  }

  handleErrors(err: HttpErrorResponse): Observable<any> {
    if (err.status === 404) {
      this.router.navigate(['/not-found']);
    } else {
      this.router.navigate(['/hotels']);
    }
    return of(err.message);
  }
}
