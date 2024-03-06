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

  verifyIsAdmin() : boolean {
    return this.authService.isAdmin();
  }

  verifyIfUserConnected() : User | null {
    return this.authService.connectedUser;
  }

  logout() {
    this.authService.removeUserFromLocalStorage();
  }
}
