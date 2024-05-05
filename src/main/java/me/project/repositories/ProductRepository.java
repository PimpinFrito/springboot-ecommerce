package me.project.repositories;

import me.project.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository {

    Page<Product> findByCategoryId(Long id, Pageable pageable);
}
