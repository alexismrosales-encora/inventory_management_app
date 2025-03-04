package com.breakabletoy.ima_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductDTO {
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private LocalDate expiryDate;

    public ProductDTO(Long id, String name, String category, BigDecimal price, LocalDate expiryDate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.expiryDate = expiryDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }
}
