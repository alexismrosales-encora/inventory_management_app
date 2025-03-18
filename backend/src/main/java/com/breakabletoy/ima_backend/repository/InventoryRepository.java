package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.CategoryMetric;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;
import java.util.Optional;

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
}