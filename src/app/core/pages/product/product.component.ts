import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productForm!: FormGroup;
  constructor(
    public productService: ProductService,
    private formBuilder : FormBuilder
  ) {
    this.initForm();
   }

  ngOnInit(): void {
    this.getProducts();
  }

  initForm(): void{
    this.productForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required]
    });
  }

  cleanForm(){
    this.productForm.reset();
  }

  // obtener lista de categorias de la base de datos
  getProducts() {
    this.productService.getProduct()
      .subscribe(res => {
        this.products = res;
    }, badRequest => {
      console.log(badRequest);
    });

  }

  deleteById(idProduct: number){
    this.productService.deleteById(idProduct)
      .subscribe(() => {
        this.products = this.products.filter(category => category.id !== idProduct);
      }, badRequest => {
        console.log(badRequest);
      })
  }

  onSubmit(){
    const isEdit : boolean = this.productForm.get('id')?.value !== 0;
    this.productService[isEdit ? 'update' : 'save']
      (this.productForm.value).subscribe(() => {
        this.getProducts();
        this.cleanForm();
      })
  }

  setProduct(product : Product){
    this.productForm.setValue(product);
  }
}
