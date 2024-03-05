import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error : string | undefined | null;
  
  constructor(private cartService : CartService, private router : Router, private apiService : ApiService) { 
  }

  ngOnInit(): void {
    this.getAllTrainings();
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

    /**
   * Ajout d'une formation au panier via la function addTraining() du cartService
   * @param training Formation ajoutée
   */
  onAddToCart(training:Training) {
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
  }
}
