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
  constructor(private router: Router, private http: HttpClient) {}

  getHotels(path: string): Observable<ListHotels> {
    return this.http.get<ListHotels>(path);
  }

  getHotelById(id: string): Observable<ListHotels> {
    return this.http
      .get<ListHotels>('http://localhost:3000/api/hotels/id/' + id)
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
