import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../app/core/components/layout/layout.component';
import { HomeComponent } from '../app/core/pages/home/home.component';
import { ListCategoryComponent } from './core/pages/category/components/list-category/list-category.component';
import { FormCategoryComponent } from './core/pages/category/components/form-category/form-category.component';
import { ProductTypeComponent } from './core/pages/product-type/product-type.component';

const ROUTES : Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'category', children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: ListCategoryComponent },
        { path: 'form', component: FormCategoryComponent },
        ]
      },
      { path: 'product-type', component: ProductTypeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
