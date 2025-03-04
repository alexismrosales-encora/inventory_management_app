package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository {
    Optional<Inventory> findById(Long id);
    Inventory save(Inventory inventory);
    void deleteById(Long id);
    List<Inventory> findByCategoryIn(List<String> categories, Long page, Long size, String sortBy, String sortOrder);
    List<Inventory> findInStockProducts(Long page, Long size, String sortBy, String sortOrder);
    List<Inventory> findLowStockProducts(Long page, Long size, String sortBy, String sortOrder);
    List<Inventory> findOutOfStockProducts(Long page, Long size, String sortBy, String sortOrder);
}