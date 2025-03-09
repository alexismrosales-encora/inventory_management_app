import { StockStatus } from '../utils/inventory.utils.ts'
export interface Product {
  id: number,
  name: string,
  category: string,
  price: number,
  expiryDate: Date,
  dateCreated: Date,
  dateUpdated: Date
}

export interface InventoryItem {
  id: number,
  product: Product,
  quantity: number,
  stockStatus: StockStatus,
}

export interface PaginatedResponse {
  items: InventoryItem[],
  totalItems: number
}

export interface Pagination {
  page: number,
  size: number,
  sortBy: string,
  sortOrder: string,
}

export interface Filters {
  search: string,
  category: string,
  stockStatus: StockStatus | null
}
