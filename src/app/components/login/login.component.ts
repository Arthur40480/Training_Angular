import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm : FormGroup;
  isLoginFailed : boolean = false;

  constructor(private formBuilder : FormBuilder, private authService : AuthenticateService, private router : Router) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * Fonction qui permet à l'utilisateur de se connecter
   */
  login() : void {
    if(this.authService.ifUserExist(new User(this.myForm.value.email, this.myForm.value.password))) {
      this.isLoginFailed = false;
      this.router.navigateByUrl('trainings');
    }else {
      this.isLoginFailed = true;
    }
  }

}
