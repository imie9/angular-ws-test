import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

const URL = 'wss://demoapi.night2stay.com/api/v2/websocket';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public messages;

  constructor(private wsService: WebsocketService) {
    const authMsg = {
      action: 'login',
      data: {
        key: '123123',
        wlcompany: 'CMPN00000053'
      },
      key: '4bd97223-9ad0-4261-821d-3e9ffc356e32',
      type: 'account'
    };
    this.messages = wsService
      .connect(URL, authMsg)
      .map((response: MessageEvent) => {
        return JSON.parse(response.data);
      });
  }

  search() {
    const msg = {
      action: 'accommodation',
      data: {
        place: {in: 'CI266088ZZ'},
        date: {
          in: 1549756800000,
          out: 1549929600000
        },
        families: [
          {
            adults: 2
          }
        ],
        lastid: 0,
        num: 5

      },
      key: '2ee1edbf-d90f-4785-b9db-5b07ce70a928',
      type: 'service'
    };
    this.wsService.send(msg);
  }
}
