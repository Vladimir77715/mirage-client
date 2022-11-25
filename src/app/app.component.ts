import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chattestang';
  private conn : WebSocket | undefined
  isClosed :boolean = false
  messages :string[] = []
  constructor() {
  }

  ngOnInit(): void {
    this.conn = new WebSocket("ws://" + "localhost:8080" + "/ws");
    this.conn.onclose =  (evt) => {
      this.isClosed = true
    };
    this.conn.onmessage =  (evt) => {
      this.messages.push(evt.data)
    };
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.conn.close()
    this.messages = []
  }

  wsSend($event: HTMLInputElement) {
    if ($event.value !== '') {
      // @ts-ignore
      this.conn.send(msg.value);
      $event.value = ""
    }
  }
}
