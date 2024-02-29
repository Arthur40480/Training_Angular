import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice : Number = 0;

  constructor(public cartService : CartService) { }

  ngOnInit(): void {
    this.totalPrice = this.cartService.getTotalPrice();
  }
  
  /**
   * Suppression d'une formation du panier via la function removeTraining() du cartService
   * @param training Formation supprimée
   */
  removeToCart(training : Training) {
    this.cartService.removeTraining(training);
    this.totalPrice = this.cartService.getTotalPrice();
  }

}
