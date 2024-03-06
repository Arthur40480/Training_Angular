import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  listUser: User[] = [];
  error : string | undefined | null;

  constructor(private apiService : ApiService) {
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
    }else {
      console.log("L'utilisateur n'existe pas !")
    }
  }

  isAdmin() {
    return true;
  }
}
