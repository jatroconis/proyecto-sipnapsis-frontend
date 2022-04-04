import { NgModule } from "@angular/core";

import { ListProductComponent } from "./components/list-product/list-product.component";
import { ViewProductComponent } from "./components/view-product/view-product.component";

@NgModule({
    declarations: [
        ListProductComponent,
        ViewProductComponent
    ],
    imports: [],
    entryComponents: [ViewProductComponent]
})
export class ProductModule{}
