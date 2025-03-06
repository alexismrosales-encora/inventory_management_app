package com.breakabletoy.ima_backend.dto;

import com.breakabletoy.ima_backend.enums.StockStatus;

public class PaginationRequestDTO {
    private int page;
    private int size;
    private String sortBy;
    private String sortOrder;
    private StockStatus stockStatus;
    private String category;
    private String search;

    public PaginationRequestDTO() {}

    public PaginationRequestDTO(int page, int size, String sortBy, String sortOrder, StockStatus stockStatus, String category, String search) {
        this.page = page;
        this.size = size;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.stockStatus = stockStatus;
        this.category = category;
        this.search = search;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public StockStatus getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(StockStatus stockStatus) {
        this.stockStatus = stockStatus;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}