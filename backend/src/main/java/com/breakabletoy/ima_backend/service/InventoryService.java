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

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryDTO createProduct(InventoryDTO inventoryItemDTO) {
        Inventory inventoryItem = InventoryMapper.mapToInventory(inventoryItemDTO);
        Inventory savedInventoryItem = inventoryRepository.save(inventoryItem);
        return InventoryMapper.mapToInventoryDto(savedInventoryItem);
    }

    @Override
    public List<InventoryDTO> getInventory(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventory =  inventoryRepository.findAll(paginationRequestDTO);
        return inventory.stream().map((inventoryItem) -> InventoryMapper.mapToInventoryDto(inventoryItem)).collect(Collectors.toList());
    }


    @Override
    public InventoryDTO updateProduct(Long id, InventoryDTO inventoryDTO) {
        Inventory inventoryItem = InventoryMapper.mapToInventory(inventoryDTO);
        Inventory updatedInventoryItem = inventoryRepository.update(inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    @Override
    public InventoryDTO updateProductOutOfStock(Long id) {
        Inventory inventoryItem = inventoryRepository.getById(id);
        inventoryItem.setStockStatus(StockStatus.OUT_OF_STOCK);
        inventoryItem.setQuantity(0);
        Inventory updatedInventoryItem = inventoryRepository.update(inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    @Override
    public InventoryDTO updateProductInStock(Long id) {
        Inventory inventoryItem = inventoryRepository.getById(id);
        inventoryItem.setStockStatus(StockStatus.IN_STOCK);
        inventoryItem.setQuantity(10);
        Inventory updatedInventoryItem = inventoryRepository.update(inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    @Override
    public void deleteProduct(Long id) {
        inventoryRepository.deleteById(id);
    }

    @Override
    public List<String> getCategories() {
        List<String> categories = inventoryRepository.findAllCategories();
        return categories;
    }

    @Override
    public long getTotalItems() {
        return inventoryRepository.totalItems();
    }

    @Override
    public MetricsDTO calculateMetrics() {
        List<CategoryMetric> categoryMetrics = new ArrayList<>();
        List<String> categories = inventoryRepository.findAllCategories();
        List<Inventory> inventoryItems = inventoryRepository.findAllWithoutPagination();

        BigDecimal totalValueInStock = BigDecimal.ZERO;
        int totalProductsInStockGlobal = 0;

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
