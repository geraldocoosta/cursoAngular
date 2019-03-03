import { Injectable } from "@angular/core";

import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";

@Injectable()
export class OrderService {


    constructor(private cartService: ShoppingCartService) { }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    aumentaQuantidade(item: CartItem) {
        this.cartService.aumentaQuantidade(item);
    }

    diminuiQuantidade(item: CartItem) {
        this.cartService.diminuiQuantidade(item);
    }

    remove(item: CartItem) {
        this.cartService.remove(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

}
