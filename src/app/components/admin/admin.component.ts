import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error : string | undefined | null;

  constructor(private apiService : ApiService, private errorService : ErrorServiceService) { }

  ngOnInit(): void {
    this.getAllTrainings();
  }

  /**
   * Fonction pour récupérer les formations depuis la bdd
   */
  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (error) => {
        console.error("Une erreur s'est produite lors de la récupération des formations :", error);
        this.errorService.setError("Une erreur s'est produite lors de la récupération des données.");
      }
    })
  }

    /**
   * Fonction pour supprimer une formation
   * @param training formation à supprimée
   */
    deleteTraining(training: Training) {
      if(training.id !== undefined) {
        this.apiService.deleteTraining(training.id).subscribe({
          next: response => {
            console.log("Formation supprimée avec succès: ", response),
            this.getAllTrainings();
          },
          error: error => {
            console.error("Une erreur s'est produite lors de la suppression de la formation :", error);
            this.errorService.setError("Une erreur s'est produite lors de la suppression de la formation.");
          }
        });
      }
    };

    /**
     * Récupère le message d'erreur via errorService
     * @returns String | null
     */
    displayErrorMsg() : String | null {
      return this.errorService.getError();
    };
}
