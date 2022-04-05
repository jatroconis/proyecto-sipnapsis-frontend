import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { category } from 'src/app/models/category';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss'],
  providers: [CategoryService]
})
export class MainCategoryComponent implements OnInit {
  categorys: category[] = [];
  categoryForm!: FormGroup;
  constructor(
    public categoryService: CategoryService,
    private formBuilder : FormBuilder
  ) {
    this.initForm();
   }

  ngOnInit(): void {
    this.getCategories();
  }

  initForm(): void{
    this.categoryForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required]
    });
  }

  cleanForm(){
    this.categoryForm.reset();
  }

  // obtener lista de categorias de la base de datos
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(res => {
        this.categorys = res;
    }, badRequest => {
      console.log(badRequest);
    });

  }

  deleteById(idCategory: number){
    this.categoryService.deleteCategory(idCategory)
      .subscribe(() => {
        this.categorys = this.categorys.filter(category => category.id !== idCategory);
      }, badRequest => {
        console.log(badRequest);
      })
  }

  onSubmit(){
    const isEdit : boolean = this.categoryForm.get('id')?.value !== 0;
    this.categoryService[isEdit ? 'putCategory' : 'postCategory']
      (this.categoryForm.value).subscribe(() => {
        this.getCategories();
        this.cleanForm();
      })
  }

  setCategory(category : category){
    this.categoryForm.setValue(category);
  }
}
