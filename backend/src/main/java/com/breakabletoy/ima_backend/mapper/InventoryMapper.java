package com.breakabletoy.ima_backend.mapper;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;


/*
 * InventoryMapper provides utility methods for converting between
 * Inventory entities and InventoryDTO objects.
 *
 * It contains two static methods:
 * - mapToInventoryDto: Converts an Inventory entity to an InventoryDTO.
 * - mapToInventory: Converts an InventoryDTO to an Inventory entity.
 */
public class InventoryMapper {
    /*
     * Converts an Inventory entity into an InventoryDTO.
     *
     * @param inventory The Inventory entity to be converted.
     * @return An InventoryDTO representing the data from the Inventory entity.
     */
    public static InventoryDTO mapToInventoryDto(Inventory inventory) {
        return new InventoryDTO(
                inventory.getId(),
                ProductMapper.mapToProductDto(inventory.getProduct()),
                inventory.getQuantity(),
                inventory.getStockStatus()
        );
    }

    /*
     * Converts an Inventory entity into an InventoryDTO.
     *
     * @param inventory The Inventory entity to be converted.
     * @return An InventoryDTO representing the data from the Inventory entity.
     */
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