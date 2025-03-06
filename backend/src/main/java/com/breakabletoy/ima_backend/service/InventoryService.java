package com.breakabletoy.ima_backend.service;

import com.breakabletoy.ima_backend.dto.InventoryDTO;
import com.breakabletoy.ima_backend.dto.PaginationRequestDTO;
import com.breakabletoy.ima_backend.entity.Inventory;
import com.breakabletoy.ima_backend.mapper.InventoryMapper;
import com.breakabletoy.ima_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService implements IInventoryService {
    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public InventoryDTO createProduct(InventoryDTO inventoryItemDTO) {
        Inventory inventoryItem = InventoryMapper.mapToInventory(inventoryItemDTO);
        Inventory savedInventoryItem = inventoryRepository.save(inventoryItem);
        return InventoryMapper.mapToInventoryDto(savedInventoryItem);
    }

    @Override
    public List<InventoryDTO> getInventory(PaginationRequestDTO paginationRequestDTO) {
        List<Inventory> inventory =  inventoryRepository.findAll(paginationRequestDTO);
        return inventory.stream().map((inventoryItem) -> InventoryMapper.mapToInventoryDto(inventoryItem)).collect(Collectors.toList());
    }

    @Override
    public InventoryDTO updateProduct(Long id, InventoryDTO inventoryDTO) {
        Inventory inventoryItem = InventoryMapper.mapToInventory(inventoryDTO);
        Inventory updatedInventoryItem = inventoryRepository.update(id, inventoryItem);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    @Override
    public InventoryDTO updateProductOutOfStock(Long id) {
        Inventory updatedInventoryItem = inventoryRepository.markOutOfStockById(id);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    @Override
    public InventoryDTO updateProductInStock(Long id) {
        Inventory updatedInventoryItem = inventoryRepository.markInStockById(id);
        return InventoryMapper.mapToInventoryDto(updatedInventoryItem);
    }

    @Override
    public void deleteProduct(Long id) {
        inventoryRepository.deleteById(id);
    }
}
