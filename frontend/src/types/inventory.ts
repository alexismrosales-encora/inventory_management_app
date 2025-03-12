import { StockStatus } from '../utils/inventory.utils.ts'

// TODO: Change all types name ending with Type to make it more flexible
export interface Product {
  id: number,
  name: string,
  category: string,
  price: number,
  expiryDate: Date | null,
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
  sortBy: string[],
  sortOrder: string[],
}

export interface Filters {
  search: string,
  categories: string[],
  stockStatus: StockStatus | null
}

export interface CategoryMetricType {
  category: string,
  totalProductsInStock: number,
  totalValueInStock: number,
  averagePriceInStock: number
}

export interface MetricsType {
  totalValueInStock: number,
  averagePriceInStock: number,
  categoryMetrics: CategoryMetricType[]
}
