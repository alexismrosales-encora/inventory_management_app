package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

public class InMemoryInventoryRepository implements InventoryRepository {
    private final Map<Long, Inventory> inventoryMap = new HashMap<>();
    private final AtomicLong counter = new AtomicLong();

    public Optional<Inventory> findById(Long id) {
        return Optional.ofNullable(inventoryMap.get(id));
    }

    public Inventory save(Inventory inventory) {
        if(inventory.getId() == -1) {
            inventory.setId(counter.incrementAndGet());
        }
        inventoryMap.put(inventory.getId(), inventory);
        return inventory;
    }

    public void deleteById(Long id) {
        inventoryMap.remove(id);
    }

    public List<Inventory> findByCategoryIn(List<String> categories, Long page, Long size, String sortBy, String sortOrder) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            Product product = inventory.getProduct();
            if (categories.contains(product.getCategory())) {
             inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    public List<Inventory> findInStockProducts(Long page, Long size, String sortBy, String sortOrder) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            if(inventory.getStockStatus() == StockStatus.IN_STOCK) {
                inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    public List<Inventory> findLowStockProducts(Long page, Long size, String sortBy, String sortOrder) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            if(inventory.getStockStatus() == StockStatus.LOW_STOCK) {
                inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    public List<Inventory> findOutOfStockProducts(Long page, Long size, String sortBy, String sortOrder) {
        List<Inventory> inventoryList = new ArrayList<>();
        for (Inventory inventory : inventoryMap.values()) {
            if(inventory.getStockStatus() == StockStatus.OUT_OF_STOCK) {
                inventoryList.add(inventory);
            }
        }
        return inventoryList;
    }

    // Pending
    private static List<Inventory> SortedPagination(List<Inventory> inventoryList, int page, int size, String sortBy, String sortOrder) {
        return inventoryList.subList((page - 1) * size, (page + 1) * size);
    }
}
