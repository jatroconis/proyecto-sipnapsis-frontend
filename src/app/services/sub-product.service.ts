import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubProduct } from '../models/subProduct';

@Injectable({
  providedIn: 'root'
})
export class SubProductService {
  URL_SUB_PRODUCT: string = `${environment.apiUrl}/Subproductos`;
  constructor(private http : HttpClient) { }

  save(subProduct: SubProduct){
    return this.http.post<SubProduct>(this.URL_SUB_PRODUCT, subProduct);
  }

  update(subProduct: SubProduct){
    return this.http.put<SubProduct>(`${this.URL_SUB_PRODUCT}/${subProduct.id}`, subProduct);
  }

  getSubProducts(){
    return this.http.get<SubProduct[]>(this.URL_SUB_PRODUCT);
  }

  getById(idSubProduct: number){
    return this.http.get<SubProduct>(`${this.URL_SUB_PRODUCT}/${idSubProduct}`);
  }

  deleteById(idSubProduct: number){
    return this.http.delete(`${this.URL_SUB_PRODUCT}/${idSubProduct}`);
  }
}
