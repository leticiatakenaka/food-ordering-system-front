import { Injectable } from "@angular/core";
import { Client, IMessage } from "@stomp/stompjs";

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private stompClient!: Client;
  private connected = false;
  private onConnectCallbacks: (() => void)[] = [];

  constructor() {
    this.connect();
  }

  private connect() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Conectado ao WebSocket');
        this.connected = true;
        this.onConnectCallbacks.forEach(cb => cb());
        this.onConnectCallbacks = [];
      },
      onStompError: (frame) => {
        console.error('Erro STOMP:', frame);
      }
    });

    this.stompClient.activate();
  }

  subscribe(topic: string, callback: (message: IMessage) => void) {
    if (this.connected) {
      this.stompClient.subscribe(topic, callback);
    } else {
      this.onConnectCallbacks.push(() => {
        this.stompClient.subscribe(topic, callback);
      });
    }
  }
}
