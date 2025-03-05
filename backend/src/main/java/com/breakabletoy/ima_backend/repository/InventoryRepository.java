package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository {
    Optional<Inventory> findById(Long id);
    Inventory save(Inventory inventory);
    void deleteById(Long id);
    List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO);
    List<Inventory> findByCategoryIn(List<String> categories, PaginationRequestDTO paginationRequestDTO);
    List<Inventory> findInStockProducts(PaginationRequestDTO paginationRequestDTO);
    List<Inventory> findLowStockProducts(PaginationRequestDTO paginationRequestDTO);
    List<Inventory> findOutOfStockProducts(PaginationRequestDTO paginationRequestDTO);
}