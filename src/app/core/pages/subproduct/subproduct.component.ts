import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { SubProduct } from 'src/app/models/subProduct';
import { ProductService } from 'src/app/services/product.service';
import { SubProductService } from 'src/app/services/sub-product.service';


@Component({
  selector: 'app-subproduct',
  templateUrl: './subproduct.component.html',
  styleUrls: ['./subproduct.component.scss']
})
export class SubproductComponent implements OnInit {
  subproducts: SubProduct[] = [];
  subproductForm!: FormGroup;
  products: Product[] = [];
  constructor(
    public subproductService: SubProductService,
    private _product: ProductService,
    private formBuilder : FormBuilder
  ) {
    this.initForm();
   }

  ngOnInit(): void {
    this.getSubProducts();
    this.getProducts();
  }

  initForm(): void{
    this.subproductForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      valor: ['', Validators.required],
      valor_neto: ['', Validators.required],
      valor_impuestos: ['', Validators.required],
      fecha_caducidad: ['', Validators.required],
      iD_producto: ['', Validators.required]
    });
  }

  getProducts(): void{
    this._product.getProduct()
      .subscribe(products => this.products = products);
  }

  cleanForm(){
    this.subproductForm.reset();
  }

  // obtener lista de categorias de la base de datos
  getSubProducts() {
    this.subproductService.getSubProducts()
      .subscribe(res => {
        this.subproducts = res;
    }, badRequest => {
      console.log(badRequest);
    });

  }

  deleteById(idSubproduct: number){
    this.subproductService.deleteById(idSubproduct)
      .subscribe(() => {
        this.subproducts = this.subproducts.filter(subproduct => subproduct.id !== idSubproduct);
      }, badRequest => {
        console.log(badRequest);
      })
  }

  onSubmit(){
    const isEdit : boolean = this.subproductForm.get('id')?.value !== 0;
    this.subproductService[isEdit ? 'update' : 'save']
      (this.subproductForm.value).subscribe(() => {
        this.getSubProducts();
        this.cleanForm();
      })
  }

  setProduct(subproduct : SubProduct){
    this.subproductForm.setValue(subproduct);
  }
}
