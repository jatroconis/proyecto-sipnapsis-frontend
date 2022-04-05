import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubProduct } from 'src/app/models/subProduct';
import { SubProductService } from 'src/app/services/sub-product.service';


@Component({
  selector: 'app-subproduct',
  templateUrl: './subproduct.component.html',
  styleUrls: ['./subproduct.component.scss']
})
export class SubproductComponent implements OnInit {
  subproducts: SubProduct[] = [];
  subproductForm!: FormGroup;
  constructor(
    public subproductService: SubProductService,
    private formBuilder : FormBuilder
  ) {
    this.initForm();
   }

  ngOnInit(): void {
    this.getSubProducts();
  }

  initForm(): void{
    this.subproductForm = this.formBuilder.group({
      id: 0,
      nombre: ['', Validators.required]
    });
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
