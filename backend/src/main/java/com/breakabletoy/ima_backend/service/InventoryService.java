package com.breakabletoy.ima_backend.service;

import com.breakabletoy.ima_backend.dto.CategoryMetric;
import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;
import com.breakabletoy.ima_backend.mapper.InventoryMapper;
import com.breakabletoy.ima_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService implements IInventoryService {
    private final InventoryRepository inventoryRepository;

    /*
     * Constructor for InventoryService.
     * Receives an InventoryRepository via dependency injection.
     */
    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    /*
     * Creates a new product.
     * Converts the given InventoryDTO to an Inventory entity, saves it using the repository,
     * and then maps the saved entity back to an InventoryDTO.
     *
     * @param inventoryItemDTO the InventoryDTO to create
     * @return the created InventoryDTO
     */
    @Override
    public InventoryDTO createProduct(InventoryDTO inventoryItemDTO) {
        Inventory inventoryItem = InventoryMapper.mapToInventory(inventoryItemDTO);
        Inventory savedInventoryItem = inventoryRepository.save(inventoryItem);
        return InventoryMapper.mapToInventoryDto(savedInventoryItem);
    }

    /*
     * Retrieves a paginated list of inventory items.
     * Fetches inventory items from the repository using the provided pagination request,
     * then maps each Inventory entity to an InventoryDTO.
     *
     * @param paginationRequestDTO the pagination, filtering, and sorting parameters
     * @return a list of InventoryDTOs
     */
    @Override
    public List<InventoryDTO> getInventory(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventory =  inventoryRepository.findAll(paginationRequestDTO);
        return inventory.stream().map((inventoryItem) -> InventoryMapper.mapToInventoryDto(inventoryItem)).collect(Collectors.toList());
    }

    /*
     * Updates an existing product.
     * Converts the given InventoryDTO to an Inventory entity, updates it using the repository,
     * and then maps the updated entity back to an InventoryDTO.
     *
     * @param id the ID of the product to update
     * @param inventoryDTO the updated InventoryDTO
     * @return the updated InventoryDTO
     */
    @Override
    public InventoryDTO updateProduct(Long id, InventoryDTO inventoryDTO) {
        Inventory inventoryItem = InventoryMapper.mapToInventory(inventoryDTO);
        Inventory updatedInventoryItem = inventoryRepository.update(inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    /*
     * Marks a product as out of stock.
     * Retrieves the product by its ID, sets its stock status to OUT_OF_STOCK and quantity to 0,
     * updates it using the repository, and returns the updated InventoryDTO.
     *
     * @param id the ID of the product to update
     * @return the updated InventoryDTO with the product marked as out of stock
     */
    @Override
    public InventoryDTO updateProductOutOfStock(Long id) {
        Inventory inventoryItem = inventoryRepository.getById(id);
        inventoryItem.setStockStatus(StockStatus.OUT_OF_STOCK);
        inventoryItem.setQuantity(0);
        Inventory updatedInventoryItem = inventoryRepository.update(inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    /*
     * Marks a product as in stock.
     * Retrieves the product by its ID, sets its stock status to IN_STOCK and quantity to 10,
     * updates it using the repository, and returns the updated InventoryDTO.
     *
     * @param id the ID of the product to update
     * @return the updated InventoryDTO with the product marked as in stock
     */
    @Override
    public InventoryDTO updateProductInStock(Long id) {
        Inventory inventoryItem = inventoryRepository.getById(id);
        inventoryItem.setStockStatus(StockStatus.IN_STOCK);
        inventoryItem.setQuantity(10);
        Inventory updatedInventoryItem = inventoryRepository.update(inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    /*
     * Deletes a product from the inventory.
     * Uses the repository to remove the product by its ID.
     *
     * @param id the ID of the product to delete
     */
    @Override
    public void deleteProduct(Long id) {
        inventoryRepository.deleteById(id);
    }

    /*
     * Retrieves a list of all product categories.
     *
     * @return a list of category names
     */
    @Override
    public List<String> getCategories() {
        List<String> categories = inventoryRepository.findAllCategories();
        return categories;
    }

    /*
     * Retrieves the total number of inventory items.
     *
     * @return the total number of items
     */
    @Override
    public long getTotalItems() {
        return inventoryRepository.totalItems();
    }

    /*
     * Calculates overall inventory metrics.
     * Iterates over all inventory items and categories to compute:
     * - Total monetary value in stock
     * - Global and per-category average price in stock
     * - Total number of products in stock
     * Returns these metrics encapsulated in a MetricsDTO.
     *
     * @return a MetricsDTO containing global metrics and category-specific metrics
     */
    @Override
    public MetricsDTO calculateMetrics() {
        List<CategoryMetric> categoryMetrics = new ArrayList<>();
        List<String> categories = inventoryRepository.findAllCategories();
        List<Inventory> inventoryItems = inventoryRepository.findAllWithoutPagination();

        BigDecimal totalValueInStock = BigDecimal.ZERO;
        int totalProductsInStockGlobal = 0;

        // Calculate metrics for each category
        for (String category : categories) {
            int totalProductsInStock = 0;
            BigDecimal totalValueInStockByCategory = BigDecimal.ZERO;

            for (Inventory inventory : inventoryItems) {
                Product product = inventory.getProduct();

                if (product.getCategory().equalsIgnoreCase(category) && inventory.getStockStatus() == StockStatus.IN_STOCK) {
                    totalProductsInStock += inventory.getQuantity();
                    totalValueInStockByCategory = totalValueInStockByCategory.add(
                            BigDecimal.valueOf(inventory.getQuantity()).multiply(product.getPrice())
                    );

                    // Global stats
                    totalProductsInStockGlobal += inventory.getQuantity();
                    totalValueInStock = totalValueInStock.add(
                            BigDecimal.valueOf(inventory.getQuantity()).multiply(product.getPrice())
                    );
                }
            }

            BigDecimal averagePriceInStockByCategory = (totalProductsInStock > 0)
                    ? totalValueInStockByCategory.divide(BigDecimal.valueOf(totalProductsInStock), RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;

            CategoryMetric categoryMetric = new CategoryMetric(category, totalProductsInStock, totalValueInStockByCategory, averagePriceInStockByCategory);
            // Add a new categoryMetric
            categoryMetrics.add(categoryMetric);
        }

        // Computing average price
        BigDecimal averagePriceInStockGlobal = (totalProductsInStockGlobal > 0)
                ? totalValueInStock.divide(BigDecimal.valueOf(totalProductsInStockGlobal), RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        return new MetricsDTO(totalValueInStock, averagePriceInStockGlobal, categoryMetrics);
    }
}
