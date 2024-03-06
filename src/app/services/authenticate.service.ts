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

  isAdmin() {
    return true;
  }
}
