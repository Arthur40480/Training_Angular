import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService : CartService, private router : Router, private authService : AuthenticateService) { }

  ngOnInit(): void {
  }
  
  /**
   * Suppression d'une formation du panier via la function removeTraining() du cartService
   * @param training Formation supprimée
   */
  removeToCart(training : Training) {
    this.cartService.removeTraining(training);
  }

  /**
   * Méthode qui permet de vérifier si un utilisateur est connecté
   * @returns User | null
   */
    verifyIfUserConnected() : void {
      const userConnected = this.authService.connectedUser;
      if(userConnected) {
        this.router.navigateByUrl('customer');
      } else {
        this.router.navigateByUrl('login');
      }
    }
}
