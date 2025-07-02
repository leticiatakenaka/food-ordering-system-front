import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private stompClient!: Client;
  private orderStatusSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Conectado ao WebSocket');
      },
      onStompError: (frame) => {
        console.error('Erro STOMP:', frame);
      }
    });

    this.stompClient.activate();
  }

  subscribeToOrderStatus(orderId: string): Observable<string> {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(`/topic/orders/${orderId}/payment-status`, (message: IMessage) => {
        this.orderStatusSubject.next(message.body);
      });
    } else {
      this.stompClient.onConnect = () => {
        this.stompClient.subscribe(`/topic/orders/${orderId}/payment-status`, (message: IMessage) => {
          this.orderStatusSubject.next(message.body);
        });
      };
      this.stompClient.activate(); 
    }

    return this.orderStatusSubject.asObservable();
  }
}
