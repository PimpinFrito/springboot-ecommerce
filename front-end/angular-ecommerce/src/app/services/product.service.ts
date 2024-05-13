import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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

    return this.getResults(url);
  }

  getProductListPagination(
    thePage: number = 1,
    pageSize: number = 20,
    categoryId: number
  ): Observable<GetResponseProducts> {
    let url: string;
    if (categoryId) {
      url =
        `${this.productUrl}/search/findByCategoryId?id=${categoryId}` +
        `&page=${thePage}&size=${pageSize}`;
    } else {
      url = `${this.productUrl}?page=${thePage}&size=${pageSize}`;
    }
    return this.getResultsPagination(url);
  }

  getCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetCategoryResponse>(this.baseCategoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getSearchResults(keyword: string): Observable<Product[]> {
    const url = this.searchUrl + keyword;
    return this.getResults(url);
  }

  getSearchResultsPagination(
    thePage: number = 1,
    pageSize: number = 20,
    keyword: string
  ): Observable<GetResponseProducts> {
    const url = this.searchUrl + keyword;
    return this.getResultsPagination(url);
  }

  private getResultsPagination(url: string): Observable<GetResponseProducts> {
    return this.httpClient.get<GetResponseProducts>(url);
  }

  private getResults(url: string): Observable<Product[]> {
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
