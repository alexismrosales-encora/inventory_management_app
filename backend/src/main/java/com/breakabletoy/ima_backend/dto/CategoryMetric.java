package com.breakabletoy.ima_backend.dto;

import java.math.BigDecimal;

public class CategoryMetric {
    private String category;
    private int totalProductsInStock;
    private BigDecimal totalValueInStock;
    private BigDecimal averagePriceInStock;

    public CategoryMetric(String category, int totalProductsInStock, BigDecimal totalValueInStock,  BigDecimal averagePriceInStock) {
        this.category = category;
        this.totalProductsInStock = totalProductsInStock;
        this.totalValueInStock = totalValueInStock;
        this.averagePriceInStock = averagePriceInStock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotalProductsInStock() {
        return totalProductsInStock;
    }

    public void setTotalProductsInStock(int totalProductsInStock) {
        this.totalProductsInStock = totalProductsInStock;
    }

    public BigDecimal getTotalValueInStock() {
        return totalValueInStock;
    }

    public void setTotalValueInStock(BigDecimal totalValueInStock) {
        this.totalValueInStock = totalValueInStock;
    }

    public BigDecimal getAveragePriceInStock() {
        return averagePriceInStock;
    }

    public void setAveragePriceInStock(BigDecimal averagePriceInStock) {
        this.averagePriceInStock = averagePriceInStock;
    }
}
