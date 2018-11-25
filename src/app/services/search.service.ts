import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { WebsocketService } from './websocket.service';

// const URL = 'wss://demoapi.night2stay.com/api/v2/websocketttt'; //:TODO WATCH HERE OLOLOL
const URL = 'wss://demoapi.night2stay.com/api/v2/websocket';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public messages;

  constructor(wsService: WebsocketService) {
    this.messages = wsService
      .connect(URL)
      .map((response: MessageEvent) => {
        const data = JSON.parse(response.data);
        console.log(data);
        return data;
      });
  }
}
