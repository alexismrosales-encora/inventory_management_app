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

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/products")
public class InventoryController {
    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

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

    @PostMapping()
    public ResponseEntity<InventoryDTO> createInventoryItem(@RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO savedInventoryItem = inventoryService.createProduct(inventoryDTO);
        return new ResponseEntity<>(savedInventoryItem, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> updateInventoryItem(@PathVariable Long id, @RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO updatedInventoryItem = inventoryService.updateProduct(id,inventoryDTO);
        return new ResponseEntity<>(updatedInventoryItem, HttpStatus.OK);
    }

    @PostMapping( "/{id}/outofstock")
    public ResponseEntity<InventoryDTO> updateInventoryItemOutOfStock(@PathVariable Long id) {
        InventoryDTO updateInventoryItemOutOfStock = inventoryService.updateProductOutOfStock(id);
        return new ResponseEntity<>(updateInventoryItemOutOfStock, HttpStatus.OK);
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<InventoryDTO> updateInventoryItemInStock(@PathVariable Long id) {
        InventoryDTO updateInventoryItemInStock = inventoryService.updateProductInStock(id);
        return new ResponseEntity<>(updateInventoryItemInStock, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventoryItem(@PathVariable Long id) {
        inventoryService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> findAllCategories() {
        List<String> getCategories = inventoryService.getCategories();
        return ResponseEntity.ok(getCategories);
    }

    @GetMapping("/metrics")
    public ResponseEntity<MetricsDTO>  findAllMetrics() {
        MetricsDTO metricsDTO = inventoryService.calculateMetrics();
        return ResponseEntity.ok(metricsDTO);
    }
}
