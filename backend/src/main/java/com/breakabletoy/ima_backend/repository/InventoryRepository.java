package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository {
    Optional<Inventory> findById(Long id);
    Inventory save(Inventory inventory);
    Inventory update(Long id, Inventory inventory);
    Inventory markOutOfStockById(Long id);
    Inventory markInStockById(Long id);
    void deleteById(Long id);
    List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO);
}