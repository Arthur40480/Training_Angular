import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  connectedUser : User | null;
  listUser: User[] = [];
  error : string | undefined | null;

  constructor(private apiService : ApiService, private encryptService : EncryptDecryptService) {
    this.getAllUsers();
    this.connectedUser = this.getUserfromLocalStorage();
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
   * @param userToCheck : User
   */
  ifUserExist(userToCheck: User) : boolean {
    const existingUser = this.listUser.find(user => user.password === userToCheck.password && user.email === userToCheck.email)
    if(existingUser) {
      this.saveUserInLocalStorage(existingUser);
      this.connectedUser = this.getUserfromLocalStorage()
      return true;
    }else {
      return false;
    }
  }

  /**
  * Enregistre l'utilisateur dans le LocalStorage tout en cryptant ces données
  */
  saveUserInLocalStorage(user : User) {
    const userCopy = { ...user};
    userCopy.password = this.encryptService.encrypt(user.password);
    userCopy.email = this.encryptService.encrypt(user.email);
    localStorage.setItem('user', JSON.stringify(userCopy));
  }
    
  /**
  * Récupère l'utilisateur depuis le LocalStorage tout en décryptant ces données
  */
  getUserfromLocalStorage() : User | null {
    const encryptUserData = localStorage.getItem('user');
    if(encryptUserData) {
      const user = JSON.parse(encryptUserData);
      user.password = this.encryptService.decrypt(user.password);
      user.email = this.encryptService.decrypt(user.email);
      return user;

    }else {
      return null;
    }
  }

  /**
   * Supprime l'utilisateur connecté du localStorage
   */
  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
    this.connectedUser == null;
  }

  /**
   * On vérifie si l'utilisateur connecté est un ADMIN
   * @returns boolean
   */
  isAdmin() : boolean {
    this.connectedUser = this.getUserfromLocalStorage();
    if(this.connectedUser) {
      const isAdmin= this.connectedUser.roles.includes("ADMIN");
      if(isAdmin) {
        return true;
      }else{
        return false;
      }
    }
    return false;
  }
}
