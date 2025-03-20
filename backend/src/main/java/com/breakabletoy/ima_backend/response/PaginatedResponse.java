package com.breakabletoy.ima_backend.response;

import java.util.List;


/*
 * PaginatedResponse is a generic class used to encapsulate paginated data responses.
 * It wraps a list of items of a generic type along with the total count of items available.
 *
 * Fields:
 * - items: List of items of type T.
 * - totalItems: Total number of items available.
 *
 * Constructor:
 * - Initializes the items list and the total item count.
 */
public class PaginatedResponse<T>{
    private List<T> items;
    private long totalItems;

    /*
     * Constructs a new PaginatedResponse with the specified items and total count.
     *
     * @param items the list of items for the current page.
     * @param totalItems the total number of items available.
     */
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
