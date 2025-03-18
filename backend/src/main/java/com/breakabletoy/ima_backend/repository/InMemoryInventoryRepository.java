package com.breakabletoy.ima_backend.repository;

import com.breakabletoy.ima_backend.dto.CategoryMetric;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class InMemoryInventoryRepository implements InventoryRepository {
    private final Map<Long, Inventory> inventoryMap = new HashMap<>();
    private final AtomicLong counter = new AtomicLong();
    private final Set<String> categoriesSet = new HashSet<>();

    private long currentSizeOfListOfElements = 0;
    public Optional<Inventory> findById(Long id) {
        return Optional.ofNullable(inventoryMap.get(id));
    }

    public Inventory save(Inventory inventory) {
        inventory.setId(counter.get());
        Product product = inventory.getProduct();
        product.setId(counter.getAndIncrement());
        inventoryMap.put(inventory.getId(), inventory);

        // Check if the category exists
        if(!categoriesSet.contains(inventory.getProduct().getCategory())) {
            categoriesSet.add(inventory.getProduct().getCategory());
        }
        return inventory;
    }

    public Inventory update(Inventory inventory) {
        // TODO: manage exceptions
        if (inventory == null || !inventoryMap.containsKey(inventory.getId())) {
            throw new IllegalArgumentException("Inventory ID not found for update");
        }
        inventoryMap.put(inventory.getId(), inventory);

        if(!categoriesSet.contains(inventory.getProduct().getCategory())) {
            categoriesSet.add(inventory.getProduct().getCategory());
        }
        return inventory;
    }

    public Inventory getById(Long id) {
        return inventoryMap.get(id);
    }
    public void deleteById(Long id) {
        inventoryMap.remove(id);
    }

    public List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> filteredInventory = getFilteredInventory(paginationRequestDTO);
        List<Inventory> sortedInventory = getSortedInventory(paginationRequestDTO, filteredInventory);
        currentSizeOfListOfElements = sortedInventory.size();
        // Pagination slicing
        int page = paginationRequestDTO.getPage();
        int size = paginationRequestDTO.getSize();
        int fromIndex = (page - 1) * size; // Adjusting page index
        int toIndex = Math.min(fromIndex + size, sortedInventory.size());

        // In case is the last page available
        if (fromIndex >= sortedInventory.size()) {
            return sortedInventory.subList(Math.max(0, sortedInventory.size() - size), sortedInventory.size());
        }

        return sortedInventory.subList(fromIndex, toIndex);
    }

    public List<Inventory> findAllWithoutPagination() {
        return inventoryMap.values().stream().collect(Collectors.toList());
    }

    public List<String> findAllCategories() {
        List<String> categories = categoriesSet.stream().sorted().collect(Collectors.toList());
        return categories;
    }

    public long totalItems() {
        return currentSizeOfListOfElements;
    }


    // TODO: Fix the search of the word in the case the search keyword exist with the prefix or something
    // problem example: product1 = iPhone product2 = Computer, if keyword = i, there will be coincidence for product1 and product2
    private List<Inventory> getFilteredInventory(PaginationRequestDTO paginationRequestDTO) {
        String searchQuery = Optional.ofNullable(paginationRequestDTO.getSearch()).orElse("").toLowerCase();
        StockStatus stockStatus = paginationRequestDTO.getStockStatus();
        List<String> categories = paginationRequestDTO.getCategories();

        return inventoryMap.values().stream()
                .filter(inventory -> searchQuery.isEmpty() || inventory.getProduct().getName().toLowerCase().contains(searchQuery))
                .filter(inventory -> stockStatus == null || inventory.getStockStatus() == stockStatus)
                .filter(inventory -> categories == null || categories.isEmpty() ||  categories.contains(inventory.getProduct().getCategory()))
                .collect(Collectors.toList());
    }

    private List<Inventory> getSortedInventory(PaginationRequestDTO paginationRequest, List<Inventory> inventoryList) {
        List<String> sortByFields = paginationRequest.getSortBy();
        List<String> sortOrders = paginationRequest.getSortOrder();

        // In case there are only one SortOrders is minor, just add "asc"
        while (sortOrders.size() < sortByFields.size()) {
            sortOrders.add("asc");
        }

        Comparator<Inventory> comparator = null;

        for(int i = 0; i < sortByFields.size(); i++) {
            String sortBy = sortByFields.get(i);
            boolean isDescending = "desc".equalsIgnoreCase(sortOrders.get(i));

            Comparator<Inventory> currentComparator = switch (sortBy.toLowerCase()) {
                case "name" ->
                        Comparator.comparing(inv -> inv.getProduct().getName(), Comparator.nullsLast(Comparator.naturalOrder()));
                case "category" ->
                        Comparator.comparing(inv -> inv.getProduct().getCategory(), Comparator.nullsLast(Comparator.naturalOrder()));
                case "price" ->
                        Comparator.comparing(inv -> inv.getProduct().getPrice(), Comparator.nullsLast(Comparator.naturalOrder()));
                case "expirydate" ->
                        Comparator.comparing(inv -> inv.getProduct().getExpiryDate(), Comparator.nullsLast(Comparator.naturalOrder()));
                case "datecreated" ->
                        Comparator.comparing(inv -> inv.getProduct().getDateCreate(), Comparator.nullsLast(Comparator.naturalOrder()));
                case "stock" ->
                        Comparator.comparing(inv -> inv.getQuantity(), Comparator.nullsLast(Comparator.naturalOrder()));
                default -> throw new IllegalArgumentException("Invalid sortBy field: " + paginationRequest.getSortBy());
            };

            if(isDescending){
                currentComparator = currentComparator.reversed();
            }
            // combining comparers
            comparator = (comparator == null) ? currentComparator : comparator.thenComparing(currentComparator);
        };

        // If there is not a defined sort, the list still the same
        if (comparator != null) {
            inventoryList.sort(comparator);
        }
        return inventoryList;
    }
}
