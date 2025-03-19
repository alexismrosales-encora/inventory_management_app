import { StockStatus } from '../utils/inventory.utils.ts'

/**
 * Product interface
 *
 * Represents a product with its details.
 *
 * @property {number} id - Unique identifier of the product.
 * @property {string} name - Name of the product.
 * @property {string} category - Category of the product.
 * @property {number} price - Price of the product.
 * @property {Date | null} expiryDate - Expiration date of the product, or null if not applicable.
 * @property {Date} dateCreated - Timestamp when the product was created.
 * @property {Date} dateUpdated - Timestamp when the product was last updated.
 */
export interface Product {
  id: number,
  name: string,
  category: string,
  price: number,
  expiryDate: Date | null,
  dateCreated: Date,
  dateUpdated: Date
}

/**
 * InventoryItem interface
 *
 * Represents an inventory item which includes product details,
 * its quantity in stock, and current stock status.
 *
 * @property {number} id - Unique identifier of the inventory item.
 * @property {Product} product - The product details.
 * @property {number} quantity - The quantity available in the inventory.
 * @property {StockStatus} stockStatus - The current stock status of the product.
 */
export interface InventoryItem {
  id: number,
  product: Product,
  quantity: number,
  stockStatus: StockStatus,
}


/**
 * PaginatedResponse interface
 *
 * Represents the response from the API for paginated inventory items.
 *
 * @property {InventoryItem[]} items - Array of inventory items.
 * @property {number} totalItems - Total number of inventory items available.
 */
export interface PaginatedResponse {
  items: InventoryItem[],
  totalItems: number
}

/**
 * Pagination interface
 *
 * Defines pagination parameters used when querying inventory items.
 *
 * @property {number} page - The current page number.
 * @property {number} size - The number of items per page.
 * @property {string[]} sortBy - An array of field names to sort by.
 * @property {string[]} sortOrder - An array of sort orders corresponding to sortBy fields.
 */
export interface Pagination {
  page: number,
  size: number,
  sortBy: string[],
  sortOrder: string[],
}

/**
 * Filters interface
 *
 * Defines filter criteria used when querying inventory items.
 *
 * @property {string} search - Search text for product names.
 * @property {string[]} categories - Array of categories to filter by.
 * @property {StockStatus | null} stockStatus - Filter based on stock status, or null if not filtering by stock status.
 */
export interface Filters {
  search: string,
  categories: string[],
  stockStatus: StockStatus | null
}

/**
 * CategoryMetricType interface
 *
 * Represents metrics for a specific product category.
 *
 * @property {string} category - The category name.
 * @property {number} totalProductsInStock - Total number of products in stock within the category.
 * @property {number} totalValueInStock - Total monetary value of products in stock within the category.
 * @property {number} averagePriceInStock - Average price of products in stock within the category.
 */
export interface CategoryMetricType {
  category: string,
  totalProductsInStock: number,
  totalValueInStock: number,
  averagePriceInStock: number
}

/**
 * MetricsType interface
 *
 * Represents overall inventory metrics.
 *
 * @property {number} totalValueInStock - Total monetary value of all products in stock.
 * @property {number} averagePriceInStock - Average price of all products in stock.
 * @property {CategoryMetricType[]} categoryMetrics - Array of metrics for each product category.
 */
export interface MetricsType {
  totalValueInStock: number,
  averagePriceInStock: number,
  categoryMetrics: CategoryMetricType[]
}
