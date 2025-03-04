package com.breakabletoy.ima_backend.entity;

import com.breakabletoy.ima_backend.enums.StockStatus;

public class Inventory {
    private long id;
    private Product product;
    private int quantity;
    private StockStatus stockStatus;

    public Inventory() {}

    public Inventory(long id, Product product, int quantity, StockStatus stockStatus) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }

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
