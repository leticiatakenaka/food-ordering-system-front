import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PaymentStatusService } from '../../services/payment-status-service';
import { OrderConfirmationService } from '../../services/order-confirmation-service';
import { PaymentStatusEnum, PaymentStatusPtBrEnum } from '../../enums/payment-status-enum';
import { OrderStatusEnum, OrderStatusPtBrEnum } from '../../enums/order-status-enum';
import { Restaurant, Item, OrderRequest } from '../../models/order.model';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule],
  templateUrl: './order.html',
})
export class Order implements OnInit {

  readonly customerGuid = 'b29c3d4f-77e0-4b41-9e7d-3c1a1f6de1ef';
  readonly paymentTypeGuid = '160e72be-ff7e-4ddb-89fa-fb1b4ce5e71c';

  constructor(private api: ApiService, private paymentStatusService: PaymentStatusService, private cd: ChangeDetectorRef, private toastr: ToastrService, private orderConfirmationService: OrderConfirmationService) { }

  restaurants: Restaurant[] = [];
  items: Item[] = [];
  selectedRestaurantGuid: string = "";
  selectedRestaurantName: string = "";
  paymentStatus: string = "";
  orderStatus: string = "";
  isLoadingConfirm = false;
  isSubmitting = false;
  idOrder = "";
  isPreparing = false;

  itemQuantities: { [guid: string]: number } = {};

  ngOnInit(): void {
    this.api.getRestaurants().subscribe(data => this.restaurants = data);
  }

  submitOrder() {
    this.isSubmitting = true;

    const items = Object.entries(this.itemQuantities)
      .filter(([_, q]) => q > 0)
      .map(([itemGuid, quantity]) => ({ itemGuid, quantity }));

    const payload: OrderRequest = {
      customerGuid: this.customerGuid,
      restaurantGuid: this.selectedRestaurantGuid,
      items,
      paymentTypeGuid: this.paymentTypeGuid,
    };

    this.api.submitOrder(payload).subscribe({
      next: (response: any) => {
        const orderId = response.guid;
        this.subscribePaymentStatus(orderId);
        this.subscribeOrderConfirmation(orderId);
      },
      error: (err) => {
        this.toastr.warning('Falha ao enviar o pedido. Tente novamente.', 'Erro');
        this.isSubmitting = false;
      }
    });
  }

  subscribeOrderConfirmation(orderId: string) {
    this.orderConfirmationService.subscribeToOrderConfirmation(orderId).subscribe((msg) => {
      this.isLoadingConfirm = false;
      this.isPreparing = true;
      this.orderStatus = OrderStatusPtBrEnum.CONFIRMED;
      this.toastr.success('Pedido confirmado.', 'Sucesso');
    });
  }

  subscribePaymentStatus(orderId: string) {
    this.paymentStatusService.subscribeToPaymentStatus(orderId)
      .subscribe(response => {
        let paymentStatus: PaymentStatusEnum = JSON.parse(response).paymentStatus;
        let orderStatus: OrderStatusEnum = JSON.parse(response).orderStatus;

        this.paymentStatus = PaymentStatusPtBrEnum[paymentStatus] || paymentStatus;
        this.orderStatus = OrderStatusPtBrEnum[orderStatus] || orderStatus;

        this.getPaymentStatusColor();
        this.getOrderStatusColor();
        this.hasOrder();

        if (paymentStatus == PaymentStatusEnum.PAID && orderStatus == OrderStatusEnum.PENDING)
          this.isLoadingConfirm = true;

        this.idOrder = JSON.parse(response).orderId;
        this.isSubmitting = false;

        this.cd.detectChanges();
      });
  }

  increment(guid: string): void {
    this.itemQuantities[guid] = (this.itemQuantities[guid] || 0) + 1;
  }

  decrement(guid: string): void {
    if ((this.itemQuantities[guid] || 0) > 0) {
      this.itemQuantities[guid]--;
    }
  }

  selectRestaurant(guid: string, name: string) {
    this.selectedRestaurantGuid = guid;
    this.selectedRestaurantName = name;
    this.api.getItems(guid).subscribe(data => {
      this.items = data;
      this.itemQuantities = {};
    });
  }

  setQuantity(itemGuid: string, quantity: number) {
    this.itemQuantities[itemGuid] = quantity;
  }

  hasSelectedQuantity(): boolean {
    return Object.values(this.itemQuantities).some(qty => qty > 0);
  }

  hasSelectedRestaurant(): boolean {
    return this.selectedRestaurantGuid !== "";
  }

  hasPaymentStatus(): boolean {
    return this.paymentStatus !== "";
  }

  hasOrder(): boolean {
    return this.idOrder !== "";
  }

  getOrderStatusLabel(): string {
    return this.orderStatus;
  }

  getOrderStatusColor(): string {
    switch (this.orderStatus) {
      case OrderStatusPtBrEnum.PENDING:
        return 'text-yellow-500';
      case OrderStatusPtBrEnum.CONFIRMED:
        return 'text-blue-600';
      case OrderStatusPtBrEnum.OUT_FOR_DELIVERY:
        return 'text-orange-600';
      case OrderStatusPtBrEnum.DELIVERED:
        return 'text-green-600';
      case OrderStatusPtBrEnum.CANCELLED:
      case OrderStatusPtBrEnum.FAILED:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
  getTotal(): number {
    return this.items.reduce((total, item) => {
      const quantity = this.itemQuantities[item.guid] || 0;
      return total + item.price * quantity;
    }, 0);
  }

  getPaymentStatusColor(): string {
    switch (this.paymentStatus) {
      case 'Aguardando Pagamento':
        return 'text-yellow-500';
      case 'Pago':
        return 'text-green-600';
      case 'Recusado':
        return 'text-red-600';
      case 'Reembolsado':
        return 'text-blue-600';
      default:
        return 'text-gray-700';
    }
  }
  cancelSelection(): void {
    this.selectedRestaurantName = '';
    this.selectedRestaurantGuid = '';
    this.items = [];
    this.paymentStatus = "";
    this.orderStatus =  "";
    this.items = [];
    this.idOrder = "";
    this.isPreparing = false;
    this.isLoadingConfirm = false
  }
}
