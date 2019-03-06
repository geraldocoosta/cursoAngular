import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' },
  ];

  delivery: number = 8;

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      nome: this.formBuilder.control('',[Validators.required,Validators.minLength(1)]), // forma reduzida da próxima
      email: this.formBuilder.control(''),
      confimacaoEmail: this.formBuilder.control(''),
      endereco: this.formBuilder.control(''),
      numero: this.formBuilder.control(''),
      complemento: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    });
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

  checkOrder(order: any) {
    let orderModel = new Order(order.endereco,
      order.numero,
      order.complemento,
      order.payementOptions,
      this.cartItems().map((item: CartItem) => new OrderItem(item.quantidade, item.menuItem.id)));

    this.orderService.checkOrder(orderModel).subscribe((orderId: string) => {
      this.router.navigate(['order-summary']);
      this.orderService.clear();
    });
  }

}
