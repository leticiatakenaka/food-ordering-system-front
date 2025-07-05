export enum OrderStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED'
}

export const OrderStatusPtBrEnum: { [key in OrderStatusEnum]: string } = {
  [OrderStatusEnum.PENDING]: 'Pendente',
  [OrderStatusEnum.CONFIRMED]: 'Confirmado',
  [OrderStatusEnum.OUT_FOR_DELIVERY]: 'Saiu para entrega',
  [OrderStatusEnum.DELIVERED]: 'Entregue',
  [OrderStatusEnum.CANCELLED]: 'Cancelado',
  [OrderStatusEnum.FAILED]: 'Falhou'
};
