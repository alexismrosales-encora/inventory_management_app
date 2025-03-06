package com.breakabletoy.ima_backend.service;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;

public interface IInventoryService {
    InventoryDTO createProduct(InventoryDTO inventoryDTO);
    List<InventoryDTO> getInventory(PaginationRequestDTO paginationRequestDTO);
    InventoryDTO updateProduct(Long id, InventoryDTO inventoryDTO);
    InventoryDTO updateProductOutOfStock(Long id);
    InventoryDTO updateProductInStock(Long id);
    void deleteProduct(Long id);
}
