import axios from 'axios'
import qs from 'qs'

import { Filters, InventoryItem, MetricsType, PaginatedResponse, Pagination } from '../types/inventory'
import { StockStatus } from '../utils/inventory.utils'

const API_URL = import.meta.env.VITE_API_BASEURL + '/products'


const createInventoryItem = async (inventoryItem: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.post<InventoryItem>(API_URL, inventoryItem)
  return response.data
}

const updateInventoryItem = async (id: number, inventoryItem: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.put<InventoryItem>(API_URL + `/${id}`, inventoryItem)
  return response.data
}

const deleteInventoryItem = async (id: number): Promise<void> => {
  await axios.delete(API_URL + `/${id}`)
}


const updateInventoryItemOutOfStock = async (id: number): Promise<void> => {
  await axios.post(API_URL + `/${id}` + '/outofstock')
}

const updateInventoryItemInStock = async (id: number): Promise<void> => {
  await axios.put(API_URL + `/${id}` + '/instock')
}

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

const getCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(API_URL + '/categories')
  return response.data
}

const getMetrics = async (): Promise<MetricsType> => {
  const response = await axios.get(API_URL + '/metrics')
  return response.data
}


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
