import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';


@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error : string | undefined | null;
  
  constructor(private cartService : CartService, private router : Router, private apiService : ApiService, private errorService : ErrorServiceService) { 
  }

  ngOnInit(): void {
    this.getAllTrainings();
  }
  
  /**
   * Fonction pour récupérer les formations depuis la bdd
   */
  getAllTrainings() : void {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (error) => {
        console.error("Une erreur s'est produite lors de la récupération des formations :", error);
        this.errorService.setError("Une erreur s'est produite lors de la récupération des données.");
      }
    })
  }

    /**
   * Ajout d'une formation au panier via la function addTraining() du cartService
   * @param training Formation ajoutée
   */
  onAddToCart(training:Training) : void {
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
  }

    /**
    * Récupère le message d'erreur via errorService
    * @returns String | null
    */
    displayErrorMsg() : String | null {
      return this.errorService.getError();
    };
}
