export interface IInvoice {
  id: number;
  date: string;
  status: string;
  customer: {
    customerId: string;
    name: string;
    email: string;
    address: string;
  };
  items: Array<{
    productId: string;
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  total: number;
}
