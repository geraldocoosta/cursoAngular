import { Injectable } from "@angular/core";

import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

@Injectable()
export class ShoppingCartService {

    items: CartItem[] = [];

    clear() {
        this.items = [];
    }

    total(): number {
        return this.items.map(item => item.value()).reduce((a, b) => a + b, 0);
    }

    addItem(item: MenuItem) {

        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

        if (foundItem) {
            foundItem.quatindade += 1;
            return;
        }
        this.items.push(new CartItem(item));

    }

    remove(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}
