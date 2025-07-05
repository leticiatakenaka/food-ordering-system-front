export interface Restaurant {
  guid: string;
  name: string;
}

export interface Item {
  guid: string;
  name: string;
  price: number;
}

export interface OrderItem {
  itemGuid: string;
  quantity: number;
}

export interface OrderRequest {
  customerGuid: string;
  restaurantGuid: string;
  items: OrderItem[];
  paymentTypeGuid: string;
}
