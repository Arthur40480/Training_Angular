import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  listArticle : Training[];
  totalPrice : number;
  newCustomer : Customer;

  constructor() {
    this.listArticle = [];
    this.totalPrice = 0;
    this.newCustomer = new Customer('', '', '', '', '');
    this.loadDataFromLocalStorage();
  }

  /**
   * Enregistre le client dans le LocalStorage
   */
  saveCustomerInLocalStorage(customer : Customer) {
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  /**
   * Récupération des données du panier/client via le LocalStorage
   */
  loadDataFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    const customerData = localStorage.getItem('customer');
    if(cartData) {
      this.listArticle = JSON.parse(cartData);
    };
    if(customerData) {
      this.newCustomer = JSON.parse(customerData);
    }
    this.getTotalPrice();
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
    this.getTotalPrice();
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
    this.getTotalPrice();
  }

  /**
   * Calcule le coût total du panier
   */
  getTotalPrice() {
    this.totalPrice = 0;
    if(this.listArticle.length > 0) {
      for(let article of this.listArticle) {
        this.totalPrice += article.price * article.quantity;
      }
    }else {
      this.totalPrice = 0;
    }
  }

  /**
   * Vide le localStorage ainsi que le panier
   */
  validateOrder() {
    this.listArticle = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('customer');
    this.getTotalPrice();
  }
}
