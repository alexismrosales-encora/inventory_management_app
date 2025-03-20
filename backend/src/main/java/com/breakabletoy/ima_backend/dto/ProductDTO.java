package com.breakabletoy.ima_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

/*
 * ProductDTO represents a data transfer object for product details.
 *
 * Fields:
 * - id: Unique identifier for the product.
 * - name: Name of the product.
 * - category: The category the product belongs to.
 * - price: Price of the product.
 * - expiryDate: Expiry date of the product (if applicable).
 * - dateCreated: Date when the product was created.
 * - dateUpdated: Date when the product was last updated.
 *
 * Constructor:
 * Initializes a new instance of ProductDTO with the provided values.
 */
public class ProductDTO {
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private LocalDate expiryDate;
    private LocalDate dateCreated;
    private LocalDate dateUpdated;

    public ProductDTO(Long id, String name, String category, BigDecimal price, LocalDate expiryDate, LocalDate dateCreated, LocalDate dateUpdated) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.expiryDate = expiryDate;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }
    // Getters and setters are provided below.
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

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDate getDateUpdated() {
        return dateUpdated;
    }
}
