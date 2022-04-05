import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeProduct } from '../models/typeProduct';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  URL_TIPO_PRODUCTO: string = `${environment.apiUrl}/tipoProductos`;
  constructor(private http: HttpClient) { }

  save(typeProduct: TypeProduct){
    return this.http.post<TypeProduct>(this.URL_TIPO_PRODUCTO, typeProduct);
  }

  update(typeProduct: TypeProduct){
    return this.http.put<TypeProduct>(`${this.URL_TIPO_PRODUCTO}/${typeProduct.id}`, typeProduct);
  }

  getTypeProducts(){
    return this.http.get<TypeProduct[]>(this.URL_TIPO_PRODUCTO);
  }

  getById(idTypeProduct: number){
    return this.http.get<TypeProduct>(`${this.URL_TIPO_PRODUCTO}/${idTypeProduct}`);
  }

  deleteById(idTypeProduct: number){
    return this.http.delete(`${this.URL_TIPO_PRODUCTO}/${idTypeProduct}`);
  }
}
