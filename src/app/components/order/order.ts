import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { OrderStatusService } from '../../services/order-status.service';
import { Restaurant, Item, OrderRequest } from '../../models/order.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.html',
})
export class Order implements OnInit {
  restaurants: Restaurant[] = [];
  items: Item[] = [];
  selectedRestaurantGuid: string = "";
  orderStatus: string = "";

  itemQuantities: { [guid: string]: number } = {};

  increment(guid: string): void {
    this.itemQuantities[guid] = (this.itemQuantities[guid] || 0) + 1;
  }

  decrement(guid: string): void {
    if ((this.itemQuantities[guid] || 0) > 0) {
      this.itemQuantities[guid]--;
    }
  }


  readonly customerGuid = '5c0c6502-62a4-4bae-ad09-3f3f849c55cf';
  readonly paymentTypeGuid = '8bc37f5e-a744-42d1-affa-078ab8baac97';

  constructor(private api: ApiService, private orderStatusService: OrderStatusService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getRestaurants().subscribe(data => this.restaurants = data);
  }

  selectRestaurant(guid: string) {
    this.selectedRestaurantGuid = guid;
    this.api.getItems(guid).subscribe(data => {
      this.items = data;
      this.itemQuantities = {};
    });
  }

  setQuantity(itemGuid: string, quantity: number) {
    this.itemQuantities[itemGuid] = quantity;
  }

  submitOrder() {
    const items = Object.entries(this.itemQuantities)
      .filter(([_, q]) => q > 0)
      .map(([itemGuid, quantity]) => ({ itemGuid, quantity }));

    const payload: OrderRequest = {
      customerGuid: this.customerGuid,
      restaurantGuid: this.selectedRestaurantGuid,
      items,
      paymentTypeGuid: this.paymentTypeGuid,
    };

    this.api.submitOrder(payload).subscribe((response: any) => {
      alert('Pedido enviado com sucesso!');
      const orderId = response.guid;
      this.subscribeOrderStatus(orderId);
    });
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      const quantity = this.itemQuantities[item.guid] || 0;
      return total + item.price * quantity;
    }, 0);
  }

  subscribeOrderStatus(orderId: string) {
    debugger
    this.orderStatusService.subscribeToOrderStatus(orderId)
      .subscribe(response => {
        let status = JSON.parse(response).status;
        this.orderStatus = status;
        console.log('📬 Status recebido:', response);

        this.cd.detectChanges();
      });
  }
}
