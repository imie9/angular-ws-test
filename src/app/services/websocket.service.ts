import { Injectable, OnDestroy, Inject } from '@angular/core';
import * as Rx from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {

  private subject: Rx.Subject<MessageEvent>;
  private ws: WebSocket;
  private authorized: Rx.BehaviorSubject<boolean>;
  public message: Rx.BehaviorSubject<MessageEvent>;

  constructor() { }

  public connect(url: string, authMsg: object = null): Rx.Subject<MessageEvent> {
    this.authorized = new Rx.BehaviorSubject<boolean>(false);
    this.message = new Rx.BehaviorSubject<MessageEvent>(null);
    if (!this.subject) {
      this.ws = new WebSocket(url);
      this.subject = this.create();
    }

    if (!!authMsg) {
      this.ws.addEventListener('open', () => {
        this.ws.send(JSON.stringify(authMsg));
        this.authorized.next(true);
      });
    }

    this.ws.addEventListener('message', msg => {
      this.message.next(JSON.parse(msg.data));
    });

    return this.subject;
  }

  private create(): Rx.Subject<MessageEvent> {
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

  public send(data): void {
    if (!this.authorized.getValue()) {
      this.authorized.subscribe(authorized => {
        if (authorized) {
          this.ws.send(JSON.stringify(data));
        }
      });
    } else {
      this.ws.send(JSON.stringify(data));
    }
  }

  ngOnDestroy() {
    this.ws.close();
  }
}
