import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppComponent } from './app.component';

import { WebsocketService } from './services/websocket.service';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule
  ],
  providers: [
    WebsocketService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
