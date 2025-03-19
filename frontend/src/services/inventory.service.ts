import axios from 'axios'
import qs from 'qs'

import { Filters, InventoryItem, MetricsType, PaginatedResponse, Pagination } from '../types/inventory'
import { StockStatus } from '../utils/inventory.utils'

const API_URL = import.meta.env.VITE_API_BASEURL + '/products'


/**
 * Creates a new inventory item.
 *
 * @param {InventoryItem} inventoryItem - The inventory item to create.
 * @returns {Promise<InventoryItem>} A promise that resolves to the created inventory item.
 */
const createInventoryItem = async (inventoryItem: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.post<InventoryItem>(API_URL, inventoryItem)
  return response.data
}

/**
 * Updates an existing inventory item.
 *
 * @param {number} id - The ID of the inventory item to update.
 * @param {InventoryItem} inventoryItem - The updated inventory item data.
 * @returns {Promise<InventoryItem>} A promise that resolves to the updated inventory item.
 */
const updateInventoryItem = async (id: number, inventoryItem: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.put<InventoryItem>(API_URL + `/${id}`, inventoryItem)
  return response.data
}

/**
 * Deletes an inventory item.
 *
 * @param {number} id - The ID of the inventory item to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
const deleteInventoryItem = async (id: number): Promise<void> => {
  await axios.delete(API_URL + `/${id}`)
}

/**
 * Marks an inventory item as out of stock.
 *
 * @param {number} id - The ID of the inventory item.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
const updateInventoryItemOutOfStock = async (id: number): Promise<void> => {
  await axios.post(API_URL + `/${id}` + '/outofstock')
}

/**
 * Marks an inventory item as in stock.
 *
 * @param {number} id - The ID of the inventory item.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
const updateInventoryItemInStock = async (id: number): Promise<void> => {
  await axios.put(API_URL + `/${id}` + '/instock')
}

/**
 * Retrieves a paginated list of inventory items based on provided pagination and filter criteria.
 *
 * @param {Pagination} pagination - The pagination parameters (e.g., page, size, sort options).
 * @param {Filters} filters - The filter criteria for the inventory.
 * @returns {Promise<PaginatedResponse>} A promise that resolves to the paginated response containing inventory items.
 */
const getAllItems = async (pagination: Pagination, filters: Filters): Promise<PaginatedResponse> => {
  // Here would be useful to use react context
  const response = await axios.get<PaginatedResponse>(API_URL, {
    params: {
      ...pagination,
      ...filters,
      stockStatus: filters.stockStatus !== null ? StockStatus[filters.stockStatus] : null,
    },
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response.data
}

/**
 * Retrieves the list of product categories.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of category names.
 */
const getCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(API_URL + '/categories')
  return response.data
}

/**
 * Retrieves inventory metrics.
 *
 * @returns {Promise<MetricsType>} A promise that resolves to the inventory metrics.
 */
const getMetrics = async (): Promise<MetricsType> => {
  const response = await axios.get(API_URL + '/metrics')
  return response.data
}


/**
 * Inventory Service
 *
 * Provides functions to interact with the inventory API.
 */
const inventoryService = {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryItemOutOfStock,
  updateInventoryItemInStock,
  getAllItems,
  getCategories,
  getMetrics
}

export default inventoryService
