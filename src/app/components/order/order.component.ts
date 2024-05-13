import { Component, OnInit, SimpleChange } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ApiService } from 'src/app/services/api.service';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public cartService : CartService, private apiService : ApiService) { }

  ngOnChanges(changes: SimpleChange) : void {
    console.log("ngOnChanges" + changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit")
  }

  ngDoCheck(): void {
    console.log("ngDoCheck");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
  }

  createOrder():void {
    this.apiService.saveOrder(new Order(this.cartService.totalPrice))
    this.cartService.clearCart();
  }

}
