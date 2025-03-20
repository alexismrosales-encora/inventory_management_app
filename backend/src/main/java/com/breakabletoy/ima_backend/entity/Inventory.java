package com.breakabletoy.ima_backend.entity;

import com.breakabletoy.ima_backend.enums.StockStatus;


/*
 * Inventory entity represents an inventory record in the system.
 *
 * Fields:
 * - id: Unique identifier for the inventory record.
 * - product: The associated product details.
 * - quantity: The available quantity of the product.
 * - stockStatus: The current stock status (e.g., IN_STOCK, OUT_OF_STOCK).
 *
 * Constructors:
 * - Default constructor.
 * - Parameterized constructor to initialize all fields.
 */
public class Inventory {
    private long id;
    private Product product;
    private int quantity;
    private StockStatus stockStatus;

    // Default constructor
    public Inventory() {}

    // Parameterized constructor
    public Inventory(long id, Product product, int quantity, StockStatus stockStatus) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }

    // Getters and setters are provided below.
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
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
