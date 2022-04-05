import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TypeProduct } from 'src/app/models/typeProduct';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  typeProducts: TypeProduct[] = [];
  products: Product[] = [];
  productForm!: FormGroup;
  constructor(
    public productService: ProductService,
    private formBuilder : FormBuilder,
    private _typeproduct: TipoProductoService
  ) {
    this.initForm();
   }

  ngOnInit(): void {
    this.getProducts();
    this.getTypeproduct();
  }

  getTypeproduct(): void {
    this._typeproduct
      .getTypeProducts()
      .subscribe((typeproduct) => (this.typeProducts = typeproduct));
  }

  initForm(): void{
    this.productForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      codigo: ['', Validators.required],
      iD_tipoProducto: ['', Validators.required],
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
