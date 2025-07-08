import { Injectable } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from './web-socket-service';

@Injectable({
  providedIn: 'root'
})

export class OrderConfirmationService {
  private confirmationSubject: Subject<string> = new Subject<string>();

  constructor(private wsService: WebSocketService) {}

  subscribeToOrderConfirmation(orderId: string): Observable<string> {
    this.wsService.subscribe(`/topic/orders/${orderId}/confirmed-orders`, (message: IMessage) => {
      this.confirmationSubject.next(message.body);
    });
    return this.confirmationSubject.asObservable();
  }
}