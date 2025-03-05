package com.breakabletoy.ima_backend.controller;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("")
@RestController
@RequestMapping(value = "/api/products")
public class InventoryController {
    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping()
    public ResponseEntity<InventoryDTO> createInventory(@RequestBody InventoryDTO inventoryDTO) {
        InventoryDTO savedInventoryItem = inventoryService.createProduct(inventoryDTO);
        return new ResponseEntity<>(savedInventoryItem, HttpStatus.CREATED);
    }

    @GetMapping()
    // TODO: Modify the request body and use request params instead
    public ResponseEntity<List<InventoryDTO>> findAll(@RequestBody PaginationRequestDTO paginationRequestDTO) {
        List<InventoryDTO> getInventory = inventoryService.getInventory(paginationRequestDTO);
        return ResponseEntity.ok(getInventory);
    }

    // TODO: Add method to update a product by id
    // TODO: Add method to mark a product out of stock
    // TODO: Add method to mark a product in stock
}
