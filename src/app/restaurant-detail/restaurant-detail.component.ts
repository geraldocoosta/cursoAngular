import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from './../restaurants/restaurant.service';

import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) { }

  restaurant: Restaurant;

  ngOnInit() {

    let id = this.route.snapshot.params['id'];

    this.restaurantService.restaurantById(id).subscribe(restaurant => this.restaurant = restaurant);
  }

}
