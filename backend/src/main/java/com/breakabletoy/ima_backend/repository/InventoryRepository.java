package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.CategoryMetric;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;
import java.util.Optional;

/*
 * InventoryRepository defines the operations for managing inventory data.
 *
 * Methods:
 * - findById: Retrieves an inventory item by its ID (wrapped in an Optional).
 * - save: Persists a new inventory item.
 * - update: Updates an existing inventory item.
 * - deleteById: Deletes an inventory item by its ID.
 * - getById: Retrieves an inventory item by its ID (directly).
 * - findAll: Retrieves a paginated list of inventory items based on filtering, sorting, and pagination parameters.
 * - findAllWithoutPagination: Retrieves all inventory items without pagination.
 * - findAllCategories: Retrieves all unique product categories.
 * - totalItems: Returns the total number of inventory items after applying filters.
 * - clear: Clears all inventory data from the repository.
 */
public interface InventoryRepository {
    Optional<Inventory> findById(Long id);
    Inventory save(Inventory inventory);
    Inventory update(Inventory inventory);
    void deleteById(Long id);
    Inventory getById(Long id);
    List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO);
    List<Inventory> findAllWithoutPagination();
    List<String> findAllCategories();
    long totalItems();
    public void clear();
}