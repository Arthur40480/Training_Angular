import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  listUser: User[] = [];
  error : string | undefined | null;

  constructor(private apiService : ApiService, private encryptService : EncryptDecryptService) {
    this.getAllUsers();
  }

  /**
   * Récupération des Users dans la bdd
   */
  getAllUsers() {
    this.apiService.getUsers().subscribe({
      next : (data) => this.listUser = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

  /**
   * On vérifie si l'utilisateur existe 
   * @param user 
   */
  ifUserExist(userToCheck: User) {
    const existingUser = this.listUser.find(user => user.password === userToCheck.password && user.email === userToCheck.email)
    if(existingUser) {
      console.log("L'utilisateur est connecté")
      this.saveUserInLocalStorage(existingUser);
      this.getUserfromLocalStorage();
    }else {
      console.log("L'utilisateur n'existe pas !")
    }
  }

  /**
   * Enregistre le client dans le LocalStorage tout en cryptant ces données
   */
    saveUserInLocalStorage(user : User) {
      user.password = this.encryptService.encrypt(user.password);
      user.email = this.encryptService.encrypt(user.email);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
  /**
   * Récupère le client depuis le LocalStorage tout en décryptant ces données
   */
    getUserfromLocalStorage() {
      const encryptUserData = localStorage.getItem('user');
      if(encryptUserData) {
        const user = JSON.parse(encryptUserData);
        user.password = this.encryptService.decrypt(user.password);
        user.email = this.encryptService.decrypt(user.email);
        console.log(user);
      }else {
        console.log("NADA")
      }
    }

  isAdmin() {
    return true;
  }
}
