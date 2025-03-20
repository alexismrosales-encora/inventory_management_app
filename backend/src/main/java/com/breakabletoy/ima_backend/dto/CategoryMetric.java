package com.breakabletoy.ima_backend.dto;

import java.math.BigDecimal;


/*
 * CategoryMetric DTO
 *
 * This class represents the metrics for a specific product category.
 * It includes:
 * - category: The name of the category.
 * - totalProductsInStock: The number of products available in this category.
 * - totalValueInStock: The total monetary value of the products in stock.
 * - averagePriceInStock: The average price of the products in stock.
 */
public class CategoryMetric {
    private String category;
    private int totalProductsInStock;
    private BigDecimal totalValueInStock;
    private BigDecimal averagePriceInStock;

    /*
     * Constructor for CategoryMetric.
     *
     * @param category the category name.
     * @param totalProductsInStock the total number of products in stock.
     * @param totalValueInStock the total monetary value of products in stock.
     * @param averagePriceInStock the average price of products in stock.
     */
    public CategoryMetric(String category, int totalProductsInStock, BigDecimal totalValueInStock,  BigDecimal averagePriceInStock) {
        this.category = category;
        this.totalProductsInStock = totalProductsInStock;
        this.totalValueInStock = totalValueInStock;
        this.averagePriceInStock = averagePriceInStock;
    }

    // Getters and setters are provided below.
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
