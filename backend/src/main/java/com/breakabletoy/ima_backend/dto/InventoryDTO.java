package com.breakabletoy.ima_backend.dto;

import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;

public class InventoryDTO {
    private Long id;
    private ProductDTO product;
    private int quantity;
    private StockStatus stockStatus;

    public InventoryDTO(long id, ProductDTO product, int quantity, StockStatus stockStatus) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.stockStatus = stockStatus;
    }

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
