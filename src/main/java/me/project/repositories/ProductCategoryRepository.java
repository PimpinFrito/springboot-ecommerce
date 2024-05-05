package me.project.repositories;

import me.project.entity.Product;
import me.project.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository  extends JpaRepository<ProductCategory, Long> {
}
