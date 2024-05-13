import { Component, OnInit, SimpleChange } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  myForm : FormGroup;

  constructor(public cartService : CartService, private apiService : ApiService, private router : Router, private formBuilder : FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      adress: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]]
    })
  }

  ngOnInit(): void {
  }
  
  /**
   * Appelle la méthode du cartService pour enregistrer le client au localStorage
   * @param customer client à enregistrer dans le localstorage
   */
  onSaveCustomer(form : FormGroup) {
    this.cartService.saveCustomerInLocalStorage(new Customer(form.value.name, form.value.lastname, form.value.adress, form.value.phone, form.value.email));
    this.router.navigateByUrl('order');
    this.apiService.saveCustomer(new Customer(form.value.name, form.value.lastname, form.value.adress, form.value.phone, form.value.email));
  }
}
