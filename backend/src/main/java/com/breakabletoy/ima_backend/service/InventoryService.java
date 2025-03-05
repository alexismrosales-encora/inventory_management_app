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
}
