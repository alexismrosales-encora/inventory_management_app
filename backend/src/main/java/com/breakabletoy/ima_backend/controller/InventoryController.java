package com.breakabletoy.ima_backend.controller;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.enums.StockStatus;
import com.breakabletoy.ima_backend.response.PaginatedResponse;
import com.breakabletoy.ima_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * InventoryController handles HTTP requests related to inventory products.
 * It provides endpoints for fetching, creating, updating, and deleting inventory items,
 * as well as retrieving product categories and inventory metrics.
 */
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/products")
public class InventoryController {
    private final InventoryService inventoryService;

    /*
     * Constructor that injects the InventoryService dependency.
     */
    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    /*
     * GET /api/products
     * Retrieves a paginated list of inventory items based on filter, sorting, and pagination parameters.
     * Expects optional parameters for sorting, filtering by stock status, categories, and search text.
     * Returns a PaginatedResponse containing the list of inventory items and total count.
     */
    @GetMapping()
    public ResponseEntity<PaginatedResponse> findAllInventoryItems(@RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "10") int size,
                                                                   @RequestParam(required = false) List<String> sortBy,
                                                                   @RequestParam(required = false) List<String> sortOrder,
                                                                   @RequestParam(required = false)StockStatus stockStatus,
                                                                   @RequestParam(required = false) List<String> categories,
                                                                   @RequestParam(required = false) String search) {
        PaginationRequestDTO savedPaginationRequestDTO;
        List<String> categoriesParam = (categories == null || categories.isEmpty()) ? null : categories;
        String searchParam = (search == null || search.trim().isEmpty()) ? null : search;
        savedPaginationRequestDTO = new PaginationRequestDTO(page, size, sortBy, sortOrder, stockStatus, categoriesParam, searchParam);
        List<InventoryDTO> getInventory = inventoryService.getInventory(savedPaginationRequestDTO);
        long totalItems = inventoryService.getTotalItems();
        PaginatedResponse paginatedResponse = new PaginatedResponse(getInventory, totalItems);
        return ResponseEntity.ok(paginatedResponse);
    }

    /*
     * POST /api/products
     * Creates a new inventory item.
     * Expects an InventoryDTO in the request body.
     * Returns the created InventoryDTO with HTTP status CREATED.
     */
    @PostMapping()
    public ResponseEntity<InventoryDTO> createInventoryItem(@RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO savedInventoryItem = inventoryService.createProduct(inventoryDTO);
        return new ResponseEntity<>(savedInventoryItem, HttpStatus.CREATED);
    }

    /*
     * PUT /api/products/{id}
     * Updates an existing inventory item.
     * Expects the inventory item ID as a path variable and updated data in the request body.
     * Returns the updated InventoryDTO with HTTP status OK.
     */
    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> updateInventoryItem(@PathVariable Long id, @RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO updatedInventoryItem = inventoryService.updateProduct(id,inventoryDTO);
        return new ResponseEntity<>(updatedInventoryItem, HttpStatus.OK);
    }

    /*
     * POST /api/products/{id}/outofstock
     * Marks an inventory item as out of stock.
     * Expects the inventory item ID as a path variable.
     * Returns the updated InventoryDTO with HTTP status OK.
     */
    @PostMapping( "/{id}/outofstock")
    public ResponseEntity<InventoryDTO> updateInventoryItemOutOfStock(@PathVariable Long id) {
        InventoryDTO updateInventoryItemOutOfStock = inventoryService.updateProductOutOfStock(id);
        return new ResponseEntity<>(updateInventoryItemOutOfStock, HttpStatus.OK);
    }

    /*
     * PUT /api/products/{id}/instock
     * Marks an inventory item as in stock.
     * Expects the inventory item ID as a path variable.
     * Returns the updated InventoryDTO with HTTP status OK.
     */
    @PutMapping("/{id}/instock")
    public ResponseEntity<InventoryDTO> updateInventoryItemInStock(@PathVariable Long id) {
        InventoryDTO updateInventoryItemInStock = inventoryService.updateProductInStock(id);
        return new ResponseEntity<>(updateInventoryItemInStock, HttpStatus.OK);
    }

    /*
     * DELETE /api/products/{id}
     * Deletes an inventory item.
     * Expects the inventory item ID as a path variable.
     * Returns HTTP status NO_CONTENT if deletion is successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventoryItem(@PathVariable Long id) {
        inventoryService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    /*
     * GET /api/products/categories
     * Retrieves a list of all product categories.
     * Returns a list of category names with HTTP status OK.
     */
    @GetMapping("/categories")
    public ResponseEntity<List<String>> findAllCategories() {
        List<String> getCategories = inventoryService.getCategories();
        return ResponseEntity.ok(getCategories);
    }

    /*
     * GET /api/products/metrics
     * Retrieves inventory metrics such as total value, average price, and category metrics.
     * Returns a MetricsDTO with HTTP status OK.
     */
    @GetMapping("/metrics")
    public ResponseEntity<MetricsDTO>  findAllMetrics() {
        MetricsDTO metricsDTO = inventoryService.calculateMetrics();
        return ResponseEntity.ok(metricsDTO);
    }
}
