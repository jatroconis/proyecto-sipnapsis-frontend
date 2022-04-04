import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { CategoryModule } from './pages/category/category.module';
import { ProductModule } from './pages/product/product.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CategoryModule,
    ProductModule
  ]
})
export class CoreModule { }
