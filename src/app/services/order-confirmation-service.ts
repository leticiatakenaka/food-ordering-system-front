import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderConfirmationService {
  private stompClient!: Client;
  private confirmationSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.connect();
  }

  private connect() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Conectado ao WebSocket (Confirmação de Pedido)');
      },
      onStompError: (frame) => {
        console.error('Erro STOMP:', frame);
      }
    });

    this.stompClient.activate();
  }

  subscribeToOrderConfirmation(orderId: string): Observable<string> {
    if (this.stompClient && this.stompClient.connected) {
      this.subscribe(orderId);
    } else {
      this.stompClient.onConnect = () => {
        this.subscribe(orderId);
      };
      this.stompClient.activate();
    }

    return this.confirmationSubject.asObservable();
  }

  private subscribe(orderId: string) {
    this.stompClient.subscribe(`/topic/orders/${orderId}/confirmed-orders`, (message: IMessage) => {
      this.confirmationSubject.next(message.body);
    });
  }
}
