import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[] = [];

  @Output() aumentarQtd = new EventEmitter<CartItem>(); 
  @Output() diminuirQtd = new EventEmitter<CartItem>(); 
  @Output() remove = new EventEmitter<CartItem>(); 
  
  constructor() { }

  ngOnInit() {
  }

  emitAumentarQuantidade(item : CartItem){
    this.aumentarQtd.emit(item);
  }

  emitDiminuirQuantidade(item : CartItem){
    this.diminuirQtd.emit(item);
  }

  emitRemove(item : CartItem){
    this.remove.emit(item);
  }


}
