import { Component, OnInit, SimpleChange } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  myForm : FormGroup;

  constructor(public cartService : CartService, private router : Router) {
    let customer = this.cartService.getCustomerFromLocalStorage();
    this.myForm = new FormGroup({
      name : new FormControl(customer.name),
      firstName: new FormControl(customer.lastname),
      address : new FormControl(customer.adress),
      phone : new FormControl(customer.phone),
      email : new FormControl(customer.email)
    })
  }

  ngOnInit(): void {
  }
  
  /**
   * Appelle la méthode du cartService pour enregistrer le client au localStorage
   * @param customer client à enregistrer dans le localstorage
   */
  onSaveCustomer(form : FormGroup) {
    this.cartService.saveCustomerInLocalStorage(new Customer(form.value.name, form.value.firstName, form.value.address, form.value.phone, form.value.email));
    this.router.navigateByUrl('order');
  }
}
