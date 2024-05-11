import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getCategories(): import('../common/product-category').ProductCategory[] {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:8080/api/';
  private productUrl = this.baseUrl + `products`;
  private baseCategoryUrl = this.baseUrl + `product-category`;
  private searchUrl = this.productUrl + '/search/findByNameContaining?name=';

  constructor(private httpClient: HttpClient) {}

  getProductList(categoryId: number): Observable<Product[]> {
    let url: string;
    const hasCategory: boolean = categoryId > 0;
    url = hasCategory
      ? `${this.productUrl}/search/findByCategoryId?id=${categoryId}`
      : this.productUrl;

    return this.getProducts(url);
  }

  getProductListPagination(
    thePage: number = 0,
    pageSize: number = 20,
    categoryId: number
  ): Observable<Product[]> {
    let url =
      `${this.productUrl}/search/findByCategoryId?id=${categoryId}` +
      `&page=${thePage}&size=${pageSize}`;
    return this.getProducts(url);
  }

  getCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetCategoryResponse>(this.baseCategoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getSearchResults(keyword: string): Observable<Product[]> {
    const url = this.searchUrl + keyword;
    return this.getProducts(url);
  }

  private getProducts(url: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductDetails(productId: number): Observable<Product> {
    const productUrl = this.productUrl + `/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
