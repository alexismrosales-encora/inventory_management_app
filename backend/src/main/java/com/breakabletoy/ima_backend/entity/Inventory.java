package com.breakabletoy.ima_backend.entity;

import com.breakabletoy.ima_backend.enums.StockStatus;

public class Inventory {
    private long id;
    private long productId;
    private int quantity;
    private StockStatus stockStatus;

    public Inventory() {}

    public Inventory(long id, long productId, int quantity, StockStatus stockStatus) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
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
