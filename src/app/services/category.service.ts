import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  selectedcategory : category ;
  categories : category[] = [];

  readonly URL_API = 'https://localhost:44326/api/Categorias';

  constructor(public http: HttpClient) {
    this.selectedcategory = new category();
  }

  postCategory(category: category) {
    return this.http.post(this.URL_API, category);
  }

  getCategories() {
    return this.http.get(this.URL_API);
  }

  putCategory(category: category) {
    return this.http.put(this.URL_API + `/${category._id}`, category);
  }

  deleteCategory(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
