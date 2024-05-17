import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  previousCategoryId: number = 0;
  currentCategoryId: number = 0;
  products: Product[] = [];
  searchMode: boolean = false;

  previousKeyword: string = '';

  pageSize: number = 20;
  pageNumber: number = 1;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  addToCart(product: Product) {
    console.log(`product : ${product.name}
    price: ${product.unitPrice}`);
    const newCartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(newCartItem);
  }

  updatePageSize(newPageSize: string) {
    this.pageSize = +newPageSize;
    this.listProducts();
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProductsPagination();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService
      .getSearchResults(keyword)
      .subscribe((data) => (this.products = data));
  }

  handleSearchProductsPagination() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService
      .getSearchResultsPagination(this.pageNumber, this.pageSize, keyword)
      .subscribe((data) => this.processResult(data));
  }

  processResult(data: any): void {
    console.log(data);
    this.products = data._embedded.products;
    this.pageNumber = data.page.number + 1;
    this.pageSize = data.page.size;
    this.totalElements = data.page.totalElements;
  }

  handleListProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')! || 0;
    }

    // this.productService
    //   .getProductList(this.currentCategoryId)
    //   .subscribe((data) => (this.products = data));

    if (this.previousCategoryId != this.currentCategoryId) this.pageNumber = 1;
    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPagination(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe((data) => this.processResult(data));
  }
}
