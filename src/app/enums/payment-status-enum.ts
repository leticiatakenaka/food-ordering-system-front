export enum PaymentStatusEnum {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  PAID = 'PAID',
  REFUSED = 'REFUSED',
  REFUNDED = 'REFUNDED'
}

export const PaymentStatusPtBrEnum: { [key in PaymentStatusEnum]: string } = {
  [PaymentStatusEnum.AWAITING_PAYMENT]: 'Aguardando Pagamento',
  [PaymentStatusEnum.PAID]: 'Pago',
  [PaymentStatusEnum.REFUSED]: 'Recusado',
  [PaymentStatusEnum.REFUNDED]: 'Reembolsado'
};