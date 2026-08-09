export interface Product {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  rackLocation: string;
  description: string;
}

export interface ProductResponse {
  _id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  rackLocation: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ProductList {
  total: number;
  page: number;
  limit: number;
  products: ProductResponse[];
}


export interface TransactionData {
  transactionType: string;
  remarks: string;
  quantity: string;
}

export interface TransactionResponse {
  message: string;
  product: ProductResponse;
}


export interface postProductResponse {
  _id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  rackLocation: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface postProductResponseData {
  message: string;
  product: ProductResponse;
}

export interface DeleteProductResponse {
  message: string;
}

export interface UpdateProductResponse {
  message: string;
  product: ProductResponse;
}