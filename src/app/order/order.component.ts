import { Component, OnInit } from '@angular/core';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' },
  ];

  delivery: number = 8;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  aumentaQuantidade(item: CartItem) {
    this.orderService.aumentaQuantidade(item);
  }

  diminuiQuantidade(item: CartItem) {
    this.orderService.diminuiQuantidade(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

}
