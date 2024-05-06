import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  currentCategoryId: number = 0;

  products: Product[] = [];

  constructor(private productService: ProductService,
                      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.listProducts();
    })
  }
  listProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){ 
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")! || 0;    
  } 

  this.productService.getProductList(this.currentCategoryId).subscribe( 
    data => this.products = data
  );
  
}
}

