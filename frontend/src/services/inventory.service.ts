import axios from 'axios'

import { InventoryItem } from '../types/inventory'

const API_URL = import.meta.env.VITE_API_BASEURL + '/products'


const createInventoryItem = async (inventoryItem: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.post<InventoryItem>(API_URL, inventoryItem)
  return response.data
}

const getAllItems = async (): Promise<InventoryItem[]> => {
  // Here would be useful to use react context
  const response = await axios.get<InventoryItem[]>(API_URL, {
    params: {
      page: 1,
      size: 10,
      sortBy: "price",
      sortOrder: "asc",
    },
  });
  return response.data
}

const inventoryService = {
  createInventoryItem,
  getAllItems
}


export default inventoryService
