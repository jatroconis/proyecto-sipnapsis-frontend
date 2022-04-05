import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL_API: string = environment.apiUrl;

  constructor(public http: HttpClient) {}

  postCategory(category: category) {
    return this.http.post(`${this.URL_API}/categorias`, category);
  }

  getCategories() {
    return this.http.get<category[]>(`${this.URL_API}/categorias`);
  }

  putCategory(category: category) {
    return this.http.put(`${this.URL_API}/categorias/${category.id}`, category);
  }

  deleteCategory(_id: number) {
    return this.http.delete(`${this.URL_API}/categorias/${_id}`);
  }

}
