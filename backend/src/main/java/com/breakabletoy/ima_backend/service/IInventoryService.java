package com.breakabletoy.ima_backend.service;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

import java.util.List;

public interface IInventoryService {
    InventoryDTO createProduct(InventoryDTO inventoryDTO);
    List<InventoryDTO> getInventory(PaginationRequestDTO paginationRequestDTO);
    // TODO: Add methods to delete and update a product
}
