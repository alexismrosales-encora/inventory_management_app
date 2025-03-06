package com.breakabletoy.ima_backend.controller;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.enums.StockStatus;
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
    public ResponseEntity<List<InventoryDTO>> findAllInventoryItems(@RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size,
                                                                    @RequestParam(defaultValue = "name") String sortBy,
                                                                    @RequestParam(defaultValue = "asc") String sortOrder,
                                                                    @RequestParam(required = false)StockStatus stockStatus,
                                                                    @RequestParam(required = false) String category,
                                                                    @RequestParam(required = false) String search) {
        PaginationRequestDTO savedPaginationRequestDTO;
        savedPaginationRequestDTO = new PaginationRequestDTO(page, size, sortBy, sortOrder, stockStatus, category, search);
        List<InventoryDTO> getInventory = inventoryService.getInventory(savedPaginationRequestDTO);
        return ResponseEntity.ok(getInventory);
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
}
