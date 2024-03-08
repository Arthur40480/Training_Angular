import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { ErrorServiceService } from './error-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private errorService: ErrorServiceService) { }

  public getTrainings() {
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  getTraining(id : number) {
    return this.http.get<Training>(environment.host + "/trainings/" + id);
  }

  public getUsers() {
    return this.http.get<User[]>(environment.host + "/users")
  }

  public addTraining(training: Training) {
    this.http.post<Training>(environment.host + "/trainings", training).subscribe({
      next: response => {
        console.log("Formation ajoutée avec succès :", response);
      },
      error: error => {
        console.error("Une erreur s'est produite lors de l'ajout de la formation :", error);
        this.errorService.setError("Une erreur s'est produite lors de la création de la formation.");
      }
    });
  }

  public updateTraining(id : number, training : Training) {
    this.http.put<Training>(environment.host + "/trainings/" + id, training).subscribe({
      next: response => {
        console.log("Formation mis à jour avec succès :", response);
      },
      error: error => {
        console.error("Une erreur s'est produite lors de la mise à jour de la formation :", error);
        this.errorService.setError("Une erreur s'est produite lors de la mise à jour de la formation.");
      }
    })
  }

  public deleteTraining(id : number) {
    this.http.delete(environment.host + "/trainings/" + id).subscribe({
      next: response => console.log("Formation supprimée avec succès: ", response),
      error: error => {
        console.error("Une erreur s'est produite lors de la suppression de la formation :", error);
        this.errorService.setError("Une erreur s'est produite lors de la suppression de la formation.");
      }
    })
  }
}
