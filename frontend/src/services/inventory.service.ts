import axios from 'axios'

import { Filters, InventoryItem, PaginatedResponse, Pagination } from '../types/inventory'
import { StockStatus } from '../utils/inventory.utils'

const API_URL = import.meta.env.VITE_API_BASEURL + '/products'


const createInventoryItem = async (inventoryItem: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.post<InventoryItem>(API_URL, inventoryItem)
  return response.data
}

const getAllItems = async (pagination: Pagination, filters: Filters): Promise<PaginatedResponse> => {
  // Here would be useful to use react context
  const response = await axios.get<PaginatedResponse>(API_URL, {
    params: {
      ...pagination,
      ...filters,
      stockStatus: filters.stockStatus !== null ? StockStatus[filters.stockStatus] : null,
    },
  });
  return response.data
}

const getCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(API_URL + '/categories')
  return response.data
}

const inventoryService = {
  createInventoryItem,
  getAllItems,
  getCategories
}

export default inventoryService
