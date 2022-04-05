import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { category } from 'src/app/models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss'],
  providers: [CategoryService]
})
export class MainCategoryComponent implements OnInit {

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  name:string="";

  cleanForm(form? : NgForm){
    if (form) {
      form.reset();
      this.categoryService.selectedcategory = new category();
    }
  }

  // obtener lista de categorias de la base de datos
  getCategories() {

    this.categoryService.getCategories().subscribe(res => {
      this.categoryService.categories = res as category[];
      console.log(res)
    });

  }

  onSave(form?: NgForm){
    this.categoryService.postCategory(form?.value).subscribe((res) => {
      this.getCategories();
      this.cleanForm();
    });
  }


}
