package com.breakabletoy.ima_backend.entity;
import java.math.BigDecimal;
import java.time.LocalDate;


/*
 * Product entity represents a product in the inventory system.
 *
 * Fields:
 * - id: Unique identifier for the product.
 * - name: Name of the product.
 * - category: The category to which the product belongs.
 * - price: The price of the product.
 * - expiryDate: The date the product expires (if applicable).
 * - dateCreate: The date the product was created.
 * - dateUpdate: The date the product was last updated.
 *
 * Constructors:
 * - Default constructor.
 * - Parameterized constructor to initialize all fields.
 */
public class Product {
    private Long id;
    private String name;
    private String category;
    private BigDecimal price;
    private LocalDate expiryDate;
    private LocalDate dateCreate;
    private LocalDate dateUpdate;

    // Default constructor
    public Product() {}

    // Parameterized constructor
    public Product(Long id, String name, String category, BigDecimal price, LocalDate expiryDate, LocalDate dateCreate, LocalDate dateUpdate) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.expiryDate = expiryDate;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
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
