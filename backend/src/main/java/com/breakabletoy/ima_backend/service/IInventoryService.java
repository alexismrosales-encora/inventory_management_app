package com.breakabletoy.ima_backend.service;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;

import java.util.List;

/*
 * IInventoryService defines the operations for managing inventory products.
 *
 * It includes methods for creating, retrieving, updating, and deleting products,
 * as well as methods for managing product stock status, retrieving categories,
 * obtaining total item count, and calculating overall inventory metrics.
 */
public interface IInventoryService {
    InventoryDTO createProduct(InventoryDTO inventoryDTO);
    List<InventoryDTO> getInventory(PaginationRequestDTO paginationRequestDTO);
    InventoryDTO updateProduct(Long id, InventoryDTO inventoryDTO);
    InventoryDTO updateProductOutOfStock(Long id);
    InventoryDTO updateProductInStock(Long id);
    void deleteProduct(Long id);
    List<String> getCategories();
    long getTotalItems();
    MetricsDTO calculateMetrics();
}
