import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from './web-socket-service';

@Injectable({
  providedIn: 'root'
})

export class PaymentStatusService {
  private paymentStatusSubject: Subject<string> = new Subject<string>();

  constructor(private wsService: WebSocketService) {}

  subscribeToPaymentStatus(orderId: string): Observable<string> {
    this.wsService.subscribe(`/topic/orders/${orderId}/payment-status`, (message: IMessage) => {
      this.paymentStatusSubject.next(message.body);
    });
    return this.paymentStatusSubject.asObservable();
  }
}