package me.springbootecommerce.repositories;

import me.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(Long id, Pageable pageable);

    Page<Product> findByNameContaining(String name, Pageable pageable);
}
