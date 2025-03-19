package com.breakabletoy.ima_backend.mapper;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;

public class InventoryMapper {
    public static InventoryDTO mapToInventoryDto(Inventory inventory) {
        return new InventoryDTO(
                inventory.getId(),
                ProductMapper.mapToProductDto(inventory.getProduct()),
                inventory.getQuantity(),
                inventory.getStockStatus()
        );
    }

    public static Inventory mapToInventory(InventoryDTO inventoryDTO) {
        Product product = (inventoryDTO.getProduct() != null)
                ? ProductMapper.mapToProduct(inventoryDTO.getProduct())
                : null;
        return new Inventory(
                inventoryDTO.getId(),
                product,
                inventoryDTO.getQuantity(),
                inventoryDTO.getStockStatus()
        );
    }
}