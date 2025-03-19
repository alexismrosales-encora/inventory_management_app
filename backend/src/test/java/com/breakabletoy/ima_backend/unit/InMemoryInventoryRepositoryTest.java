package com.breakabletoy.ima_backend.unit;
import static org.junit.jupiter.api.Assertions.*;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;
import com.breakabletoy.ima_backend.repository.InMemoryInventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

class InMemoryInventoryRepositoryTest {

    private InMemoryInventoryRepository inventoryRepository;

    @BeforeEach
    void setUp() {
        inventoryRepository = new InMemoryInventoryRepository();

        // Creating new products
        Product product1 = new Product(null, "Laptop", "Electronics", new BigDecimal("1000.00"),
                LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());

        Product product2 = new Product(null, "Phone", "Electronics", new BigDecimal("500.00"),
                LocalDate.of(2025, 6, 30), LocalDate.now(), LocalDate.now());

        Product product3 = new Product(null, "Shirt", "Clothing", new BigDecimal("20.00"),
                null, LocalDate.now(), LocalDate.now());

        // New Inventory Tests Items
        Inventory inventory1 = new Inventory(0L, product1, 10, StockStatus.IN_STOCK);
        Inventory inventory2 = new Inventory(0L, product2, 5, StockStatus.OUT_OF_STOCK);
        Inventory inventory3 = new Inventory(0L, product3, 15, StockStatus.IN_STOCK);

        inventoryRepository.save(inventory1);
        inventoryRepository.save(inventory2);
        inventoryRepository.save(inventory3);
    }

    @Test
    void testSave() {
        Product product = new Product(null, "Tablet", "Electronics", new BigDecimal("300.00"),
                LocalDate.of(2026, 1, 1), LocalDate.now(), LocalDate.now());

        Inventory inventory = new Inventory(0L, product, 8, StockStatus.IN_STOCK);
        Inventory savedInventory = inventoryRepository.save(inventory);

        assertNotNull(savedInventory);
        assertNotNull(savedInventory.getId());
        assertEquals("Tablet", savedInventory.getProduct().getName());
    }

    @Test
    void testFindById_Existing() {
        Optional<Inventory> found = inventoryRepository.findById(0L); // Primer elemento guardado

        assertTrue(found.isPresent());
        assertEquals("Laptop", found.get().getProduct().getName());
    }

    @Test
    void testFindById_NonExisting() {
        Optional<Inventory> found = inventoryRepository.findById(999L);
        assertFalse(found.isPresent());
    }

    @Test
    void testUpdate_Existing() {
        Optional<Inventory> existing = inventoryRepository.findById(0L);
        assertTrue(existing.isPresent());

        Inventory inventory = existing.get();
        inventory.setQuantity(99);
        Inventory updated = inventoryRepository.update(inventory);

        assertEquals(99, updated.getQuantity());
    }

    @Test
    void testUpdate_NonExisting() {
        Product product = new Product(null, "Nonexistent", "Other", new BigDecimal("50.00"),
                null, LocalDate.now(), LocalDate.now());

        Inventory inventory = new Inventory(999L, product, 5, StockStatus.IN_STOCK);

        assertThrows(IllegalArgumentException.class, () -> inventoryRepository.update(inventory));
    }

    @Test
    void testDeleteById() {
        inventoryRepository.deleteById(0L);
        Optional<Inventory> deleted = inventoryRepository.findById(0L);

        assertFalse(deleted.isPresent());
    }

    @Test
    void testFindAllWithoutPagination() {
        List<Inventory> allItems = inventoryRepository.findAllWithoutPagination();

        assertEquals(3, allItems.size());
    }

    @Test
    void testFindAllCategories() {
        List<String> categories = inventoryRepository.findAllCategories();
        assertEquals(2, categories.size()); // "Electronics" y "Clothing"
        assertTrue(categories.contains("Electronics"));
        assertTrue(categories.contains("Clothing"));
    }
}