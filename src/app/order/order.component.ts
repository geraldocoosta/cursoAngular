import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

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
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]), // forma reduzida da próxima
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      confimacaoEmail: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      numero: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      complemento: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required, Validators.minLength(1)])
    }, {
        validator: OrderComponent.emailEquals
      });
  }

  static emailEquals(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const confirmacaoEmail = group.get('confimacaoEmail');

    if (!email || !confirmacaoEmail) {
      return undefined;
    }

    if (email.value !== confirmacaoEmail.value) {

      return { 'emailComErro': true };

    }

    return undefined;
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
      console.log(orderId);
      this.router.navigate(['order-summary']);
      this.orderService.clear();
    });
  }

}
