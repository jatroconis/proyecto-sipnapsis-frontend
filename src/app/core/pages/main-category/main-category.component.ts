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
  categorys: category[] = [];
  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  name:string="";

  cleanForm(form? : NgForm){
    if (form) {
      form.reset();
    }
  }

  // obtener lista de categorias de la base de datos
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(res => {
        console.log(res);
        this.categorys = res;
    }, badRequest => {
      console.log(badRequest);
    });

  }

  onSave(form?: NgForm){
    this.categoryService.postCategory(form?.value).subscribe((res) => {
      this.getCategories();
      this.cleanForm();
    });
  }


}
