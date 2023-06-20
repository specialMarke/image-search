import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { SearchListComponent } from './components/search-list/search-list.component';

@NgModule({
  declarations: [AppComponent, SearchListComponent, ImageDetailsComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
