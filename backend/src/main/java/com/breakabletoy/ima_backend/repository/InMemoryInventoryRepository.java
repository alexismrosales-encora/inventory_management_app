package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

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

    public Inventory update(Long id, Inventory inventory) {
        // TODO: manage exceptions
        if (inventory == null || !inventoryMap.containsKey(id)) {
            throw new IllegalArgumentException("Inventory ID not found for update");
        }
        inventoryMap.put(inventory.getId(), inventory);
        return inventory;
    }

    public Inventory markOutOfStockById(Long id) {
        Inventory inventory = inventoryMap.get(id);
        inventory.setStockStatus(StockStatus.OUT_OF_STOCK);
        return inventory;
    }

    public Inventory markInStockById(Long id) {
        Inventory inventory = inventoryMap.get(id);
        inventory.setStockStatus(StockStatus.IN_STOCK);
        return inventory;
    }

    public void deleteById(Long id) {
        inventoryMap.remove(id);
    }

    public List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> filteredInventory = getFilteredInventory(paginationRequestDTO);
        return getSortedInventory(paginationRequestDTO, filteredInventory);
    }

    // TODO: Fix the search of the word in the case the search keyword exist with the prefix or something
    // problem example: product1 = iPhone product2 = Computer, if keyword = i, there will be coincidence for product1 and product2
    private List<Inventory> getFilteredInventory(PaginationRequestDTO paginationRequestDTO) {
        String searchQuery = Optional.ofNullable(paginationRequestDTO.getSearch()).orElse("").toLowerCase();
        StockStatus stockStatus = paginationRequestDTO.getStockStatus();
        String category = paginationRequestDTO.getCategory();

        return inventoryMap.values().stream()
                .filter(inventory -> searchQuery.isEmpty() || inventory.getProduct().getName().toLowerCase().contains(searchQuery))
                .filter(inventory -> stockStatus == null || inventory.getStockStatus() == stockStatus)
                .filter(inventory -> category == null || inventory.getProduct().getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    private List<Inventory> getSortedInventory(PaginationRequestDTO paginationRequest, List<Inventory> inventoryList) {
        Comparator<Inventory> comparator = switch (paginationRequest.getSortBy().toLowerCase()) {
            case "name" ->
                    Comparator.comparing(i -> i.getProduct().getName(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "category" ->
                    Comparator.comparing(i -> i.getProduct().getCategory(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "price" ->
                    Comparator.comparing(i -> i.getProduct().getPrice(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "expirydate" ->
                    Comparator.comparing(i -> i.getProduct().getExpiryDate(), Comparator.nullsLast(Comparator.naturalOrder()));
            case "datecreated" ->
                    Comparator.comparing(i -> i.getProduct().getDateCreate(), Comparator.nullsLast(Comparator.naturalOrder()));
            default -> throw new IllegalArgumentException("Invalid sortBy field: " + paginationRequest.getSortBy());
        };

        if ("desc".equalsIgnoreCase(paginationRequest.getSortOrder())) {
            comparator = comparator.reversed();
        }

        inventoryList.sort(comparator);

        return inventoryList;
    }
}
