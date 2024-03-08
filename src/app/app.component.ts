import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'trainings-front-app';

  constructor(private authService : AuthenticateService) {}

  /**
   * Méthode pour vérifier si l'utilisateur est un admin
   * @returns boolean
   */
  verifyIsAdmin() : boolean {
    return this.authService.isAdmin();
  }

  /**
   * Méthode qui permet de vérifier si un utilisateur est connecté
   * @returns User | null
   */
  verifyIfUserConnected() : User | null {
    return this.authService.connectedUser;
  }

  /**
   * Méthode de déconnexion
   */
  logout() {
    this.authService.removeUserFromLocalStorage();
  }
}
