import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { UserRole } from '../model/userRole.model';

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
  getAllUsers() : void {
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
    console.log(this.listUser[0].userRoles)
    const existingUser = this.listUser.find(user => user.password === userToCheck.password && user.username === userToCheck.username)
    if(existingUser) {
      this.saveUserInLocalStorage(existingUser);
      this.connectedUser = this.getUserfromLocalStorage()
      console.log("User connecter:", this.connectedUser)
      return true;
    }else {
      return false;
    }
  }

  /**
  * Enregistre l'utilisateur dans le LocalStorage tout en cryptant ces données
  */
  saveUserInLocalStorage(user : User) : void {
    const userCopy = { ...user};
    userCopy.password = this.encryptService.encrypt(user.password);
    userCopy.username = this.encryptService.encrypt(user.username);
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
      user.username = this.encryptService.decrypt(user.username);
      return user;

    }else {
      return null;
    }
  }

  /**
   * Supprime l'utilisateur connecté du localStorage
   */
  removeUserFromLocalStorage() : void {
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
      const isAdmin= this.connectedUser.userRoles.some(userRole => userRole.role.name == "ADMIN");
      if(isAdmin) {
        console.log("C'est un admin", this.connectedUser)
        return true;
      }else{
        console.log("Ce n'est pas un admin", this.connectedUser)
        return false;
      }
    }
    return false;
  }
}
