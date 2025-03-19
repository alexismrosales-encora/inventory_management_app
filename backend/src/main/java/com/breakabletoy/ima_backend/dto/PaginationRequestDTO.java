package com.breakabletoy.ima_backend.dto;

import com.breakabletoy.ima_backend.enums.StockStatus;

import java.util.List;

public class PaginationRequestDTO {
    private int page;
    private int size;
    private List<String> sortBy;
    private List<String> sortOrder;
    private StockStatus stockStatus;
    private List<String> categories;
    private String search;

    public PaginationRequestDTO() {}

    public PaginationRequestDTO(int page, int size, List<String> sortBy, List<String> sortOrder, StockStatus stockStatus, List<String> categories, String search) {
        this.page = page;
        this.size = size;
        this.sortBy = (sortBy != null) ? sortBy : List.of();
        this.sortOrder = (sortOrder != null) ? sortOrder : List.of();
        this.stockStatus = stockStatus;
        this.categories =(categories != null) ? categories : List.of();
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

    public List<String> getSortBy() {
        return sortBy;
    }

    public void setSortBy(List<String> sortBy) {
        this.sortBy = sortBy;
    }

    public List<String> getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(List<String> sortOrder) {
        this.sortOrder = sortOrder;
    }

    public StockStatus getStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(StockStatus stockStatus) {
        this.stockStatus = stockStatus;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}