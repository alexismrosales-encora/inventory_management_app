package com.breakabletoy.ima_backend.mapper;

import com.breakabletoy.ima_backend.dto.ProductDTO;
import com.breakabletoy.ima_backend.entity.Product;

public class ProductMapper {
    public ProductDTO mapToProductDto(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getExpiryDate()
        );
    }

    public Product mapToProduct(ProductDTO productDTO) {
        return new Product(
                productDTO.getId(),
                productDTO.getName(),
                productDTO.getCategory(),
                productDTO.getPrice(),
                productDTO.getExpiryDate()
        );
    }
}
