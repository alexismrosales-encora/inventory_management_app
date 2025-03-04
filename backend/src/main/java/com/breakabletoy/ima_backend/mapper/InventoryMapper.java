package com.breakabletoy.ima_backend.mapper;


import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.entity.Inventory;

public class InventoryMapper {
    public static InventoryDTO mapToInventoryDto(Inventory inventory) {
        return new InventoryDTO(
                inventory.getId(),
                inventory.getProductId(),
                inventory.getQuantity(),
                inventory.getStockStatus()
        );
    }

    public static Inventory mapToInventory(InventoryDTO inventoryDTO) {
        return new Inventory(
                inventoryDTO.getId(),
                inventoryDTO.getProductId(),
                inventoryDTO.getQuantity(),
                inventoryDTO.getStockStatus()
        );
    }
}
