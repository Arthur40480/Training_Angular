import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error : string | undefined | null;

  constructor(private router : Router, private apiService : ApiService) { }

  ngOnInit(): void {
    this.getAllTrainings();
  }

  /**
   * Fonction pour récupérer les formations depuis la bdd
   */
  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }

    /**
   * Fonction pour supprimer une formation
   */
    deleteTraining(training: Training) {
      if(training.id !== undefined) {
        this.apiService.deleteTraining(training.id).subscribe({
          next: response => {
            console.log("Formation supprimée avec succès :", response);
            this.getAllTrainings();
          },
          error: error => {
            console.error("Une erreur s'est produite lors de la suppression de la formation :", error);
          }
        });
      }
    }
}
