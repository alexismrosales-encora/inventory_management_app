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

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private InventoryDTO inventoryDTO;
    @Autowired
    private InMemoryInventoryRepository inMemoryInventoryRepository;
    @Autowired
    private InventoryRepository inventoryRepository;


    @BeforeEach
    void setUp() {
        ProductDTO productDTO = new ProductDTO(1L, "Laptop", "Electronics", new BigDecimal("1000.00"),
                LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());
        inventoryDTO = new InventoryDTO(1L, productDTO, 10, StockStatus.IN_STOCK);
    }

    @BeforeEach
    void cleanDatabase() {
        if (inventoryRepository instanceof InMemoryInventoryRepository) {
            ((InMemoryInventoryRepository) inventoryRepository).clear(); // ✅ Borra los datos antes de cada test
        }
    }

    @Test
    void testCreateAndGetInventory() throws Exception {
        // Crear un producto
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isCreated());

        // Obtener la lista de productos y verificar que haya 1
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(1)))
                .andExpect(jsonPath("$.totalItems").value(1));
    }

    @Test
    void testUpdateInventory() throws Exception {
        // 1️⃣ Crear un producto y obtener el ID generado
        String response = mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inventoryDTO)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        // Extraer el ID del producto creado
        InventoryDTO createdInventory = objectMapper.readValue(response, InventoryDTO.class);
        Long inventoryId = createdInventory.getId();

        // 2️⃣ Asegurar que `inventoryDTO` tenga el ID correcto
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

        // Extraer el ID del producto creado
        InventoryDTO createdInventory = objectMapper.readValue(response, InventoryDTO.class);
        Long inventoryId = createdInventory.getId();

        // 2️⃣ Eliminar el producto con el ID real
        mockMvc.perform(delete("/api/products/" + inventoryId))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items", hasSize(0)))
                .andExpect(jsonPath("$.totalItems").value(0));
    }
}

