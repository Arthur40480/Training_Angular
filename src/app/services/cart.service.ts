import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart : Training[];
  totalPrice : number;
  newCustomer : Customer;

  constructor() {
    this.totalPrice = 0;
    this.newCustomer = new Customer('', '', '', '', '');
    let cart = localStorage.getItem("cart");
    if(cart) {
      this.cart = JSON.parse(cart);
    }else {
      this.cart = [];
    }
  }

  /**
   * Enregistre le client dans le LocalStorage
   */
  saveCustomerInLocalStorage(customer : Customer) {
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  /**
   * Renvoi le client à partir du LocalStorage si il existe, sinon renvoi une instance de la classe Customer
   * @returns customer
   */
  getCustomerFromLocalStorage() {
    let customer = localStorage.getItem("customer");
    if(customer) {
      return JSON.parse(customer);
    }else {
      return new Customer("Unknow", "", "", "", "");
    }
  }

  /**
   * Ajout d'une formation au panier
   * @param training Formation ajoutée
   */
  addTraining(training: Training) {
    const existingArticleInCart = this.cart?.find(article => article.id == training.id);
    if(existingArticleInCart) {
      existingArticleInCart.quantity += training.quantity;
    } else {
      if(training.quantity > 0) {
        this.cart?.push(training);
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.getTotalPrice();
  }

  /**
   * Suppression d'une formation dans le panier
   * @param training Formation supprimée
   */
  removeTraining(training: Training) {
    const indexArticleToDelete = this.cart?.indexOf(training);
    if(indexArticleToDelete !== -1) {
      this.cart?.splice(indexArticleToDelete, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.getTotalPrice();
  }

  /**
   * Calcule le coût total du panier
   */
  getTotalPrice() {
    this.totalPrice = 0;
    if(this.cart.length > 0) {
      for(let article of this.cart) {
        this.totalPrice += article.price * article.quantity;
      }
    }else {
      this.totalPrice = 0;
    }
  }

  /**
   * Vide le panier
   */
  clearCart() {
    this.cart = [];
    this.clearLocalStorage();
    this.getTotalPrice();
  }

  /**
   * Vide le localStorage
   */
  clearLocalStorage() {
    localStorage.removeItem('cart');
    localStorage.removeItem('customer');
  }
}
