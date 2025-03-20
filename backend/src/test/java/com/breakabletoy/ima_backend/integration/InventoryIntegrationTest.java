package com.breakabletoy.ima_backend.integration;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.ProductDTO;
import com.breakabletoy.ima_backend.enums.StockStatus;
import com.breakabletoy.ima_backend.repository.InMemoryInventoryRepository;
import com.breakabletoy.ima_backend.repository.InventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class InventoryIntegrationTest {

    // Used to perform HTTP requests in tests.
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private InventoryDTO inventoryDTO;
    @Autowired
    private InMemoryInventoryRepository inMemoryInventoryRepository;
    @Autowired
    private InventoryRepository inventoryRepository;


    // Set up a sample InventoryDTO before each test.
    @BeforeEach
    void setUp() {
        ProductDTO productDTO = new ProductDTO(1L, "Laptop", "Electronics", new BigDecimal("1000.00"),
                LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());
        inventoryDTO = new InventoryDTO(1L, productDTO, 10, StockStatus.IN_STOCK);
    }

    // Clean the in-memory repository before each test to ensure a fresh state.
    @BeforeEach
    void cleanDatabase() {
        if (inventoryRepository instanceof InMemoryInventoryRepository) {
            ((InMemoryInventoryRepository) inventoryRepository).clear();
        }
    }

    @Test
    void testCreateAndGetInventory() throws Exception {
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isCreated());

        // Perform a GET request to retrieve inventory data and verify one product exists.
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(1)))
                .andExpect(jsonPath("$.totalItems").value(1));
    }

    @Test
    void testUpdateInventory() throws Exception {
        // Create a product and get the ID
        String response = mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        // Extract the product
        InventoryDTO createdInventory = objectMapper.readValue(response, InventoryDTO.class);
        Long inventoryId = createdInventory.getId();

        // Check if it has the correct ID
        inventoryDTO.setId(inventoryId);
        inventoryDTO.setQuantity(20);
        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(20));
    }

    @Test
    void testDeleteInventory() throws Exception {
        String response = mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        // Extract the product
        InventoryDTO createdInventory = objectMapper.readValue(response, InventoryDTO.class);
        Long inventoryId = createdInventory.getId();

        // Delete the product
        mockMvc.perform(delete("/api/products/" + inventoryId))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(0)))
                .andExpect(jsonPath("$.totalItems").value(0));
    }
}

