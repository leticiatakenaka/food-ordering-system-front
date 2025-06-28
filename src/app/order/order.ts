import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderStatusService } from './order-status.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.html'
})

export class OrderComponent implements OnInit {
  orderStatus: string = 'PENDING';
  orderId: number = 32;

  constructor(
    private orderStatusService: OrderStatusService,
    private cd: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    this.orderStatusService.subscribeToOrderStatus(this.orderId)
      .subscribe(response => {
        let status = JSON.parse(response).status;
        this.orderStatus = status;
        console.log('📬 Status recebido:', response);

        this.cd.detectChanges();
      });
  }
}
