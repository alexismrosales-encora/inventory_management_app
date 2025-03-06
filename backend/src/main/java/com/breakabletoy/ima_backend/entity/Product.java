package com.breakabletoy.ima_backend.entity;
import java.math.BigDecimal;
import java.time.LocalDate;

public class Product {
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private LocalDate expiryDate;
    private LocalDate dateCreate;
    private LocalDate dateUpdate;

    public Product() {}

    public Product(Long id, String name, String category, BigDecimal price, LocalDate expiryDate, LocalDate dateCreate, LocalDate dateUpdate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.expiryDate = expiryDate;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
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

    public LocalDate getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(LocalDate dateCreate) {
        this.dateCreate = dateCreate;
    }

    public LocalDate getDateUpdate() {
        return dateUpdate;
    }

    public void setDateUpdate(LocalDate dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
