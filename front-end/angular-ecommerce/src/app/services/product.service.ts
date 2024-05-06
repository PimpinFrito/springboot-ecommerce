import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number) : Observable<Product[]>{
    let url : string;
    const hasCategory: boolean = categoryId > 0;
    url = hasCategory ? `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` : this.baseUrl;
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
