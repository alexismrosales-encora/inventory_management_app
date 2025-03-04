package com.breakabletoy.ima_backend.dto;

import com.breakabletoy.ima_backend.enums.StockStatus;

public class InventoryDTO {
    private Long id;
    private Long productId;
    private int quantity;
    private StockStatus stockStatus;

    public InventoryDTO(long id, long productId, int quantity, StockStatus stockStatus) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
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
