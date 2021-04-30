import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HotelsListComponent } from './components/hotels-list/hotels-list.component';
import { HotelComponent } from './components/hotel/hotel.component';

@NgModule({
  declarations: [AppComponent, HotelsListComponent, HotelComponent],
  imports: [BrowserModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
