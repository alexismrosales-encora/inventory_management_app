package com.breakabletoy.ima_backend.dto;

import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;

/*
 * InventoryDTO represents an inventory item.
 * It encapsulates:
 * - id: The unique identifier of the inventory item.
 * - product: The product details as a ProductDTO.
 * - quantity: The number of items available in inventory.
 * - stockStatus: The current stock status (e.g., IN_STOCK, OUT_OF_STOCK).
 */
public class InventoryDTO {
    private Long id;
    private ProductDTO product;
    private int quantity;
    private StockStatus stockStatus;

    /*
     * Constructs a new InventoryDTO with the given parameters.
     *
     * @param id the unique identifier for the inventory item.
     * @param product the product details as a ProductDTO.
     * @param quantity the available quantity.
     * @param stockStatus the current stock status.
     */
    public InventoryDTO(long id, ProductDTO product, int quantity, StockStatus stockStatus) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }

    // Getters and setters are provided below.
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public StockStatus getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(StockStatus stockStatus) {
        this.stockStatus = stockStatus;
    }
}
