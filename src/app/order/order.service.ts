import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { Observable } from "rxjs/Observable";

import { Order } from "./order.model";
import { MEAT_API } from "app/app.api";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";

import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: Http) { }

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

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order),
            new RequestOptions({ headers: headers }))
            .map(resp => resp.json())
            .map(order => order.id);
    }

    clear(): any {
        this.cartService.clear();
    }

}
