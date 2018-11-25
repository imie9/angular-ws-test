import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import {WebsocketService} from './services/websocket.service';
import {SearchService} from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public hotels = [];
  public img_url = 'https://img1.night2stay.com';
  public is_done = false;

  constructor(private ws: WebsocketService, private searchService: SearchService, private spinner: NgxSpinnerService) {}

  stars(num: number): Array<number> {
    switch (num) {
      case 0:
        num = 3;
        break;
      case 1:
        num = 4;
        break;
      case 2:
        num = 5;
        break;
    }
    return new Array(num);
  }

  ngOnInit() {
    this.searchService.search();
    this.spinner.show();
    this.searchService.messages.subscribe(msg => {
      if (msg.data && msg.data.search) {
        if (!msg.data.done) {
          setTimeout(() => {
            this.searchService.search();
          }, (msg.data.exptime / 100));
        } else {
          this.spinner.hide();
          this.is_done = true;
          this.hotels = msg.data.search;
        }
      }
    });
  }
}
