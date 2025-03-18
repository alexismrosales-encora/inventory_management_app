package com.breakabletoy.ima_backend.response;

import java.util.List;

public class PaginatedResponse<T>{
    private List<T> items;
    private long totalItems;

    public PaginatedResponse(List<T> items, long totalItems) {
        this.items = items;
        this.totalItems = totalItems;
    }

    public List<T> getItems() {
        return items;
    }

    public long getTotalItems() {
        return totalItems;
    }
}
