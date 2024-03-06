import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private authService : AuthenticateService) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /**
   * Fonction qui vérifie si l'utilisateur existe
   */
  connectUser() {
    console.log(this.myForm.value);
  }
}
