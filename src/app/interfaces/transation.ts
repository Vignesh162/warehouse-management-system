export interface Transaction {
  _id: string;
  productId: string;
  productName: string;
  productSKU: string;
  type: string;
  quantity: number;
  remarks: string;
  performedBy: string;
  performedByName: string;
  transactionDate: string;
}

export interface TransactionHistory {
  total: number;
  page: number;
  limit: number;
  transactions: Transaction[];
}