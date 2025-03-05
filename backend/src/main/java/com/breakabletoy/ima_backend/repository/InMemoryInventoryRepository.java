package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class InMemoryInventoryRepository implements InventoryRepository {
    private final Map<Long, Inventory> inventoryMap = new HashMap<>();
    private final AtomicLong counter = new AtomicLong();

    public Optional<Inventory> findById(Long id) {
        return Optional.ofNullable(inventoryMap.get(id));
    }

    public Inventory save(Inventory inventory) {
        inventory.setId(counter.get());
        Product product = inventory.getProduct();
        product.setId(counter.getAndIncrement());
        inventoryMap.put(inventory.getId(), inventory);
        return inventory;
    }

    public void deleteById(Long id) {
        inventoryMap.remove(id);
    }

    public List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO) {
        return new ArrayList<>(inventoryMap.values());
    }

    public List<Inventory> findByCategoryIn(List<String> categories, PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            Product product = inventory.getProduct();
            if (categories.contains(product.getCategory())) {
             inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    public List<Inventory> findInStockProducts(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            if(inventory.getStockStatus() == StockStatus.IN_STOCK) {
                inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    public List<Inventory> findLowStockProducts(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            if(inventory.getStockStatus() == StockStatus.LOW_STOCK) {
                inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    public List<Inventory> findOutOfStockProducts(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            if(inventory.getStockStatus() == StockStatus.OUT_OF_STOCK) {
                inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    // TODO: Update and sort depending on the type of sorting
    private static List<Inventory> SortedPagination(List<Inventory> inventoryList, PaginationRequestDTO paginationRequestDTO) {
        return inventoryList.subList((paginationRequestDTO.getPage() - 1) * paginationRequestDTO.getSize(), (paginationRequestDTO.getPage() + 1) * paginationRequestDTO.getSize());
    }
}
