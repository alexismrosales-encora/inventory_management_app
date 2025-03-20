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

/*
 * InMemoryInventoryRepository is an in-memory implementation of the InventoryRepository interface.
 * It uses a HashMap to store inventory items, an AtomicLong for generating unique IDs, and a Set
 * to keep track of unique product categories.
 */
@Repository
public class InMemoryInventoryRepository implements InventoryRepository {
    // Map to store inventory items by their unique ID.
    private final Map<Long, Inventory> inventoryMap = new HashMap<>();
    // Atomic counter for generating unique IDs.
    private final AtomicLong counter = new AtomicLong();
    // Set to store unique product categories.
    private final Set<String> categoriesSet = new HashSet<>();

    // Stores the current size of the filtered and sorted inventory list.
    private long currentSizeOfListOfElements = 0;

    /*
    * Returns an Optional containing the Inventory item with the given ID, if it exists.
    */
    public Optional<Inventory> findById(Long id) {
        return Optional.ofNullable(inventoryMap.get(id));
    }

    /*
     * Saves a new Inventory item.
     * Assigns a unique ID to the inventory and its product, stores it in the map,
     * and adds its category to the categories set if not already present.
     *
     * @param inventory The inventory item to be saved.
     * @return The saved inventory item.
     */
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

    /*
     * Updates an existing Inventory item.
     * Throws an exception if the inventory item is null or not found.
     * Also adds the product category to the set if necessary.
     *
     * @param inventory The inventory item with updated data.
     * @return The updated inventory item.
     */
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

    /*
     * Retrieves the Inventory item with the given ID.
     *
     * @param id The unique ID of the inventory item.
     * @return The Inventory item if found; otherwise, null.
     */
    public Inventory getById(Long id) {
        return inventoryMap.get(id);
    }

    /*
     * Deletes the Inventory item with the specified ID.
     *
     * @param id The unique ID of the inventory item to delete.
     */
    public void deleteById(Long id) {
        inventoryMap.remove(id);
    }

    /*
     * Retrieves a paginated, filtered, and sorted list of Inventory items.
     * It first applies filtering based on search text, stock status, and categories,
     * then sorts the filtered list, and finally applies pagination slicing.
     *
     * @param paginationRequestDTO Contains pagination, filtering, and sorting parameters.
     * @return A list of Inventory items for the requested page.
     */
    public List<Inventory> findAll(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> filteredInventory = getFilteredInventory(paginationRequestDTO);
        List<Inventory> sortedInventory = getSortedInventory(paginationRequestDTO, filteredInventory);
        currentSizeOfListOfElements = sortedInventory.size();
        // Pagination slicing
        int page = paginationRequestDTO.getPage();
        int size = paginationRequestDTO.getSize();
        int fromIndex = Math.max(0, (page - 1) * size); // Adjusting page index
        int toIndex = Math.min(fromIndex + size, sortedInventory.size());

        // In case is the last page available
        if (fromIndex >= sortedInventory.size()) {
            return sortedInventory.subList(Math.max(0, sortedInventory.size() - size), sortedInventory.size());
        }

        return sortedInventory.subList(fromIndex, toIndex);
    }

    /*
     * Retrieves all Inventory items without applying pagination.
     *
     * @return A list of all Inventory items.
     */
    public List<Inventory> findAllWithoutPagination() {
        return inventoryMap.values().stream().collect(Collectors.toList());
    }

    /*
     * Retrieves a sorted list of all unique product categories.
     *
     * @return A sorted list of category names.
     */
    public List<String> findAllCategories() {
        List<String> categories = categoriesSet.stream().sorted().collect(Collectors.toList());
        return categories;
    }

    /*
     * Returns the total number of Inventory items after filtering and sorting.
     *
     * @return The total number of items.
     */
    public long totalItems() {
        return currentSizeOfListOfElements;
    }

    /*
     * Clears the inventory repository.
     * This removes all Inventory items and resets the counter.
     */
    public void clear() {
        inventoryMap.clear();
        counter.set(1); // Restart counter
    }

    // TODO: Fix the search of the word in the case the search keyword exist with the prefix or something
    // problem example: product1 = iPhone product2 = Computer, if keyword = i, there will be coincidence for product1 and product2

    /*
     * Filters the Inventory items based on search query, stock status, and categories.
     *
     * @param paginationRequestDTO Contains filtering parameters.
     * @return A list of Inventory items that match the filter criteria.
     */
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

    /*
     * Sorts the provided list of Inventory items based on sorting parameters.
     * Supports sorting by name, category, price, expiry date, creation date, and stock.
     * If multiple sorting criteria are provided, they are combined.
     *
     * @param paginationRequest The DTO containing sorting parameters.
     * @param inventoryList The list of Inventory items to sort.
     * @return The sorted list of Inventory items.
     */
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
