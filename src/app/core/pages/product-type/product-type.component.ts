import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { category } from 'src/app/models/category';
import { TypeProduct } from 'src/app/models/typeProduct';
import { CategoryService } from 'src/app/services/category.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss'],
})
export class ProductTypeComponent implements OnInit {
  categorys: category[] = [];
  typeProducts: TypeProduct[] = [];
  typeProductForm!: FormGroup;
  constructor(
    private _category: CategoryService,
    private _typeProduct: TipoProductoService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  initForm(): void {
    this.typeProductForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required],
      iD_categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCategorys();
    this.getTypeProducts();
  }

  getCategorys(): void {
    this._category
      .getCategories()
      .subscribe((categorys) => (this.categorys = categorys));
  }

  getTypeProducts(): void{
    this._typeProduct.getTypeProducts()
      .subscribe(typeProducts => (this.typeProducts = typeProducts))
  }

  getNameOfcategory(idCategory: number): string | undefined{
    return this.categorys.find(category => category.id === idCategory)?.nombre;
  }

  onSubmit(){
    const isEdit : boolean = this.typeProductForm.get('id')?.value !== 0;
    this._typeProduct[isEdit ? 'update' : 'save'](this.typeProductForm.value)
      .subscribe(() => {
        this.getTypeProducts();
        this.clearForm();
      })   
  }

  clearForm(): void{
    this.typeProductForm.reset();
  }

  deleteById(idTypeProduct: number){
    this._typeProduct.deleteById(idTypeProduct)
      .subscribe(() => {
        this.typeProducts = this.typeProducts
          .filter(typeProduct => typeProduct.id !== idTypeProduct)
      })
  }

  setTypeProduct(typeProduct: TypeProduct){
    this.typeProductForm.setValue(typeProduct);
  }
}
