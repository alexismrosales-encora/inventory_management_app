package com.breakabletoy.ima_backend.unit;

import com.breakabletoy.ima_backend.controller.InventoryController;
import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.enums.StockStatus;
import com.breakabletoy.ima_backend.service.InventoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InventoryController.class)
class InventoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InventoryService inventoryService;

    @Autowired
    private ObjectMapper objectMapper;

    private InventoryDTO inventoryDTO;

    /*
     * Sets up the repository with sample data before each test.
     * Three products are created:
     * - A Laptop (Electronics, price 1000.00, with expiry date)
     * - A Phone (Electronics, price 500.00, with expiry date)
     * - A Shirt (Clothing, price 20.00, no expiry date)
     * Corresponding inventory items are then created and saved:
     * - Inventory item 1: 10 units of Laptop, IN_STOCK.
     * - Inventory item 2: 5 units of Phone, OUT_OF_STOCK.
     * - Inventory item 3: 15 units of Shirt, IN_STOCK.
     */
    @BeforeEach
    void setUp() {
        inventoryDTO = new InventoryDTO(1L, null, 10, StockStatus.IN_STOCK);
    }

    @Test
    void testFindAllInventoryItems() throws Exception {
        PaginationRequestDTO paginationRequestDTO = new PaginationRequestDTO(0, 10, null, null, null, null, null);
        List<InventoryDTO> inventoryList = List.of(inventoryDTO);
        long totalItems = 1L;

        when(inventoryService.getInventory(any(PaginationRequestDTO.class))).thenReturn(inventoryList);
        when(inventoryService.getTotalItems()).thenReturn(totalItems);

        mockMvc.perform(get("/api/products")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalItems").value(totalItems))
                .andExpect(jsonPath("$.items.length()").value(1)); // Cambio de "inventoryList" a "items"
    }

    @Test
    void testCreateInventoryItem() throws Exception {
        when(inventoryService.createProduct(any(InventoryDTO.class))).thenReturn(inventoryDTO);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.quantity").value(10))
                .andExpect(jsonPath("$.stockStatus").value("IN_STOCK"));
    }

    @Test
    void testUpdateInventoryItem() throws Exception {
        when(inventoryService.updateProduct(eq(1L), any(InventoryDTO.class))).thenReturn(inventoryDTO);

        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testUpdateInventoryItemOutOfStock() throws Exception {
        when(inventoryService.updateProductOutOfStock(1L)).thenReturn(inventoryDTO);

        mockMvc.perform(post("/api/products/1/outofstock"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testUpdateInventoryItemInStock() throws Exception {
        when(inventoryService.updateProductInStock(1L)).thenReturn(inventoryDTO);

        mockMvc.perform(put("/api/products/1/instock"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testDeleteInventoryItem() throws Exception {
        doNothing().when(inventoryService).deleteProduct(1L);

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testFindAllCategories() throws Exception {
        List<String> categories = List.of("Electronics", "Clothing");

        when(inventoryService.getCategories()).thenReturn(categories);

        mockMvc.perform(get("/api/products/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testFindAllMetrics() throws Exception {
        MetricsDTO metricsDTO = new MetricsDTO(BigDecimal.TEN, BigDecimal.ONE, List.of());

        when(inventoryService.calculateMetrics()).thenReturn(metricsDTO);

        mockMvc.perform(get("/api/products/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalValueInStock").value(10))
                .andExpect(jsonPath("$.averagePriceInStock").value(1));
    }
}