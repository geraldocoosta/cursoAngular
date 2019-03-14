import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";

export const ROUTES: Routes = [
    { path: '', component: OrderComponent }
]

@NgModule({
    declarations: [OrderItemsComponent, DeliveryCostsComponent, OrderComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class OrderModule {

}