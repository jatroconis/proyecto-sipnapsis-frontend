import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';


@NgModule({
  declarations: [
    FormCategoryComponent,
    ListCategoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoryModule { }
