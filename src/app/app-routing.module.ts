import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../app/core/components/layout/layout.component';
import { HomeComponent } from '../app/core/pages/home/home.component';

import { SubproductComponent } from './core/pages/subproduct/subproduct.component';
import { ProductComponent } from './core/pages/product/product.component';
import { ProductTypeComponent } from './core/pages/product-type/product-type.component';
import { MainCategoryComponent } from './core/pages/main-category/main-category.component';

const ROUTES : Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: 'home',         component: HomeComponent },
          { path: 'category',     component: MainCategoryComponent },
          { path: 'product-type', component: ProductTypeComponent },
          { path: 'product',      component: ProductComponent },
          { path: 'subproduct',      component:  SubproductComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
