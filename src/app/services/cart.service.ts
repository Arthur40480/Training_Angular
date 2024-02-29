import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  listArticle : Training[];
  newCustomer : Customer;

  constructor() {
    this.listArticle = [];
    this.loadCartFromLocalStorage();
    this.newCustomer = new Customer('', '', '', '', '');
  }

  /**
   * Renvoi le client
   * @returns newCustomer le client à renvoyer
   */
  getCustomer() {
    return this.newCustomer;
  }

  /**
   * Récupération des données du panier via le LocalStorage
   */
  loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if(cartData) {
      this.listArticle = JSON.parse(cartData);
    };
  };

  /**
   * Ajout d'une formation au panier
   * @param training Formation ajoutée
   */
  addTraining(training: Training) {
    const existingArticleInCart = this.listArticle?.find(article => article.id == training.id);
    if(existingArticleInCart) {
      existingArticleInCart.quantity += training.quantity;
    } else {
      if(training.quantity > 0) {
        this.listArticle?.push(training);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.listArticle));
  }

  /**
   * Suppression d'une formation dans le panier
   * @param training Formation supprimée
   */
  removeTraining(training: Training) {
    const indexArticleToDelete = this.listArticle?.indexOf(training);
    if(indexArticleToDelete !== -1) {
      this.listArticle?.splice(indexArticleToDelete, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.listArticle));
  }

    /**
   * Calcule le coût total du panier
   * @returns total => Coût total du panier
   */
  getTotalPrice() {
    let total = 0;
    if(this.listArticle.length > 0) {
      for(let article of this.listArticle) {
        total += article.price * article.quantity;
      }
      return total;
    }else {
      return total;
    }
  }

}
