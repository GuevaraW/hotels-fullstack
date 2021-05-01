import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HotelsListComponent } from './components/hotels-list/hotels-list.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsListComponent,
    HotelComponent,
    HotelDetailsComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
