package com.breakabletoy.ima_backend.mapper;

import com.breakabletoy.ima_backend.dto.ProductDTO;
import com.breakabletoy.ima_backend.entity.Product;

/*
 * ProductMapper is responsible for converting between Product entities and ProductDTO objects.
 *
 * It provides two static methods:
 * - mapToProductDto: Converts a Product entity to a ProductDTO.
 * - mapToProduct: Converts a ProductDTO to a Product entity.
 */
public class ProductMapper {
    /*
     * Converts a Product entity into a ProductDTO.
     *
     * @param product The Product entity to be converted.
     * @return A new ProductDTO that represents the data from the Product entity.
     */
    public static ProductDTO mapToProductDto(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getExpiryDate(),
                product.getDateCreate(),
                product.getDateUpdate()
        );
    }

    /*
     * Converts a Product entity into a ProductDTO.
     *
     * @param product The Product entity to be converted.
     * @return A new ProductDTO that represents the data from the Product entity.
     */
    public static Product mapToProduct(ProductDTO productDTO) {
        return new Product(
                productDTO.getId(),
                productDTO.getName(),
                productDTO.getCategory(),
                productDTO.getPrice(),
                productDTO.getExpiryDate(),
                productDTO.getDateCreated(),
                productDTO.getDateUpdated()
        );
    }
}
