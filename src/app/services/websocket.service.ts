import { Injectable, OnDestroy, Inject } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/websocket';
import { Observable, SubscriptionLike, Subject, Observer, interval } from 'rxjs';

interface Connection {
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subject: Rx.Subject<MessageEvent>;
  private ws: WebSocket;
  private connection: Observable<Connection>;

  constructor() { }

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.ws = new WebSocket(url);
      this.subject = this.create(url);
      this.connection = new Observable<Connection>(() => {

      });
      console.log('Connected ' + url);
    }

    return this.subject;
  }

  // public auth(request):Rx.Subject<MessageEvent> {
  //   const observer = {
  //
  //   }
  // }

  private create(url: string): Rx.Subject<MessageEvent> {

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    );

    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
