package com.breakabletoy.ima_backend.dto;

import java.math.BigDecimal;
import java.util.List;

/*
 * MetricsDTO represents the overall inventory metrics.
 * It includes:
 * - totalValueInStock: The total monetary value of all products in stock.
 * - averagePriceInStock: The average price of products in stock.
 * - categoryMetrics: A list of CategoryMetric objects providing metrics per category.
 */
public class MetricsDTO {
    private BigDecimal totalValueInStock;
    private BigDecimal averagePriceInStock;
    private List<CategoryMetric> categoryMetrics;

    /*
     * Constructs a new MetricsDTO with the specified values.
     *
     * @param totalValueInStock   the total value in stock.
     * @param averagePriceInStock the average price in stock.
     * @param categoryMetrics     the list of category-specific metrics.
     */
    public MetricsDTO(BigDecimal totalValueInStock, BigDecimal averagePriceInStock, List<CategoryMetric> categoryMetrics) {
        this.totalValueInStock = totalValueInStock;
        this.averagePriceInStock = averagePriceInStock;
        this.categoryMetrics = categoryMetrics;
    }

    // Getters and setters are provided below.
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

    public List<CategoryMetric> getCategoryMetrics() {
        return categoryMetrics;
    }

    public void setCategoryMetrics(List<CategoryMetric> categoryMetrics) {
        this.categoryMetrics = categoryMetrics;
    }
}
