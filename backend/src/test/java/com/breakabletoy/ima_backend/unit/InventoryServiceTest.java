package com.breakabletoy.ima_backend.unit;
import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.MetricsDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.dto.ProductDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.entity.Product;
import com.breakabletoy.ima_backend.enums.StockStatus;
import com.breakabletoy.ima_backend.mapper.InventoryMapper;
import com.breakabletoy.ima_backend.mapper.ProductMapper;
import com.breakabletoy.ima_backend.repository.InventoryRepository;
import com.breakabletoy.ima_backend.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private InventoryMapper inventoryMapper;

    @InjectMocks
    private InventoryService inventoryService;

    private Inventory inventory;
    private InventoryDTO inventoryDTO;
    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product(1L, "Laptop", "Electronics", new BigDecimal("1000.00"),
                LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());

        try (MockedStatic<ProductMapper> mockedMapper = mockStatic(ProductMapper.class)) {
            ProductDTO productDTO = new ProductDTO(1L, "Laptop", "Electronics", new BigDecimal("1000.00"),
                    LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());
            mockedMapper.when(() -> ProductMapper.mapToProductDto(product)).thenReturn(productDTO);
            inventoryDTO = new InventoryDTO(1L, productDTO, 10, StockStatus.IN_STOCK);
        }

        inventory = new Inventory(1L, product, 10, StockStatus.IN_STOCK);
    }

    @Test
    void testCreateProduct() {
        try (MockedStatic<ProductMapper> mockedMapper = mockStatic(ProductMapper.class)) {
            ProductDTO productDTO = new ProductDTO(1L, "Laptop", "Electronics", new BigDecimal("1000.00"),
                    LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());

            Product productMock = new Product(1L, "Laptop", "Electronics", new BigDecimal("1000.00"),
                    LocalDate.of(2025, 12, 31), LocalDate.now(), LocalDate.now());

            // Asegurar que siempre se devuelve un Product válido
            mockedMapper.when(() -> ProductMapper.mapToProductDto(any(Product.class))).thenReturn(productDTO);
            mockedMapper.when(() -> ProductMapper.mapToProduct(any(ProductDTO.class))).thenReturn(productMock);

            // Crear InventoryDTO asegurando que tiene un ProductDTO válido
            inventoryDTO = new InventoryDTO(1L, productDTO, 10, StockStatus.IN_STOCK);
            inventory = new Inventory(1L, productMock, 10, StockStatus.IN_STOCK);

            // Mock de InventoryMapper
            when(inventoryMapper.mapToInventory(any(InventoryDTO.class))).thenReturn(inventory);
            when(inventoryRepository.save(any(Inventory.class))).thenReturn(inventory);
            when(inventoryMapper.mapToInventoryDto(any(Inventory.class))).thenReturn(inventoryDTO);

            // Ejecutar el método del servicio
            InventoryDTO result = inventoryService.createProduct(inventoryDTO);

            // Verificaciones
            assertNotNull(result);
            assertNotNull(result.getProduct());
            assertEquals("Laptop", result.getProduct().getName());
            verify(inventoryRepository, times(1)).save(any(Inventory.class));
        }
    }



    @Test
    void testGetInventory() {
        PaginationRequestDTO paginationRequestDTO = new PaginationRequestDTO(1, 10, List.of("name"), List.of("asc"), null, null, "");

        when(inventoryRepository.findAll(paginationRequestDTO)).thenReturn(List.of(inventory));
        when(inventoryMapper.mapToInventoryDto(inventory)).thenReturn(inventoryDTO);

        List<InventoryDTO> result = inventoryService.getInventory(paginationRequestDTO);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Laptop", result.get(0).getProduct().getName());
        verify(inventoryRepository, times(1)).findAll(paginationRequestDTO);
    }

    @Test
    void testUpdateProduct() {
        when(inventoryMapper.mapToInventory(inventoryDTO)).thenReturn(inventory);
        when(inventoryRepository.update(inventory)).thenReturn(inventory);
        when(inventoryMapper.mapToInventoryDto(inventory)).thenReturn(inventoryDTO);

        InventoryDTO result = inventoryService.updateProduct(1L, inventoryDTO);

        assertNotNull(result);
        assertEquals(10, result.getQuantity());
        verify(inventoryRepository, times(1)).update(inventory);
    }

    @Test
    void testUpdateProductOutOfStock() {
        when(inventoryRepository.getById(1L)).thenReturn(inventory);
        inventory.setStockStatus(StockStatus.OUT_OF_STOCK);
        inventory.setQuantity(0);
        when(inventoryRepository.update(inventory)).thenReturn(inventory);
        when(inventoryMapper.mapToInventoryDto(inventory)).thenReturn(inventoryDTO);

        InventoryDTO result = inventoryService.updateProductOutOfStock(1L);

        assertNotNull(result);
        assertEquals(StockStatus.OUT_OF_STOCK, result.getStockStatus());
        assertEquals(0, result.getQuantity());
        verify(inventoryRepository, times(1)).update(inventory);
    }

    @Test
    void testUpdateProductInStock() {
        doReturn(inventory).when(inventoryRepository).getById(1L);
        inventory.setStockStatus(StockStatus.IN_STOCK);
        inventory.setQuantity(10);
        when(inventoryRepository.update(inventory)).thenReturn(inventory);
        when(inventoryMapper.mapToInventoryDto(inventory)).thenReturn(inventoryDTO);

        InventoryDTO result = inventoryService.updateProductInStock(1L);

        assertNotNull(result);
        assertEquals(StockStatus.IN_STOCK, result.getStockStatus());
        assertEquals(10, result.getQuantity());
        verify(inventoryRepository, times(1)).update(inventory);
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(inventoryRepository).deleteById(1L);

        inventoryService.deleteProduct(1L);

        verify(inventoryRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetCategories() {
        when(inventoryRepository.findAllCategories()).thenReturn(List.of("Electronics", "Clothing"));

        List<String> categories = inventoryService.getCategories();

        assertNotNull(categories);
        assertEquals(2, categories.size());
        assertTrue(categories.contains("Electronics"));
        assertTrue(categories.contains("Clothing"));
        verify(inventoryRepository, times(1)).findAllCategories();
    }

    @Test
    void testGetTotalItems() {
        when(inventoryRepository.totalItems()).thenReturn(100L);

        long totalItems = inventoryService.getTotalItems();

        assertEquals(100, totalItems);
        verify(inventoryRepository, times(1)).totalItems();
    }

    @Test
    void testCalculateMetrics() {
        when(inventoryRepository.findAllCategories()).thenReturn(List.of("Electronics"));
        when(inventoryRepository.findAllWithoutPagination()).thenReturn(List.of(inventory));

        MetricsDTO metricsDTO = inventoryService.calculateMetrics();

        assertNotNull(metricsDTO);
        assertEquals(new BigDecimal("10000.00"), metricsDTO.getTotalValueInStock());
        assertEquals(new BigDecimal("1000.00"), metricsDTO.getAveragePriceInStock());
        verify(inventoryRepository, times(1)).findAllCategories();
        verify(inventoryRepository, times(1)).findAllWithoutPagination();
    }
}

