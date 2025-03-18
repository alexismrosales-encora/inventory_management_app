package com.breakabletoy.ima_backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class MetricsDTO {
    private BigDecimal totalValueInStock;
    private BigDecimal averagePriceInStock;
    private List<CategoryMetric> categoryMetrics;

    public MetricsDTO(BigDecimal totalValueInStock, BigDecimal averagePriceInStock, List<CategoryMetric> categoryMetrics) {
        this.totalValueInStock = totalValueInStock;
        this.averagePriceInStock = averagePriceInStock;
        this.categoryMetrics = categoryMetrics;
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

    public List<CategoryMetric> getCategoryMetrics() {
        return categoryMetrics;
    }

    public void setCategoryMetrics(List<CategoryMetric> categoryMetrics) {
        this.categoryMetrics = categoryMetrics;
    }
}
