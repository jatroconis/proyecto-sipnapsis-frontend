import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_PRODUCT: string = `${environment.apiUrl}/Productos`;
  constructor(private http : HttpClient) { }

  save(product: Product){
    return this.http.post<Product>(this.URL_PRODUCT, product);
  }

  update(product: Product){
    return this.http.put(`${this.URL_PRODUCT}/${product.id}`, product);
  }

  getProduct(){
    return this.http.get<Product[]>(this.URL_PRODUCT);
  }

  getById(idProduct: number){
    return this.http.get<Product>(`${this.URL_PRODUCT}/${idProduct}`);
  }

  deleteById(idProduct: number){
    return this.http.delete(`${this.URL_PRODUCT}/${idProduct}`);
  }
}
