import { Component, OnInit } from '@angular/core';

import {WebsocketService} from './services/websocket.service';
import {SearchService} from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private url = 'wss://demoapi.night2stay.com/api/v2/websocket';

  constructor(private ws: WebsocketService, private search: SearchService) {
    search.messages.subscribe(msg => {
      console.log('Response: ' + msg);
    });
  }

  sendMsg() {
    // const msg = {
    //   action: 'accommodation',
    //   data: {
    //     place: {
    //       in: 'CI266088ZZ'
    //     },
    //     date: {
    //       in: 1549756800000,
    //       out: 1549929600000
    //     },
    //     families: [
    //       {
    //         adults: 2
    //       }
    //     ],
    //     lastid: 0,
    //     num: 5
    //   },
    //   key: '2ee1edbf-d90f-4785-b9db-5b07ce70a928',
    //   type: 'service'
    // };

    const msg = {
      action: 'login',
      data: {
        key: '123123',
        wlcompany: 'CMPN00000053'
      },
      key: '4bd97223-9ad0-4261-821d-3e9ffc356e32',
      type: 'account'
    };

    this.search.messages.next(msg);

  }

  ngOnInit() {

  }
}
