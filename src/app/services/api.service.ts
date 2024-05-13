import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { ErrorServiceService } from './error-service.service';
import { Category } from '../model/category.model';
import { Customer } from '../model/customer.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private errorService: ErrorServiceService) { }
  
  public getTrainings() {
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  public getTraining(id : number) {
    return this.http.get<Training>(environment.host + "/trainings/" + id);
  }

  public getTrainingByCategory(id : number) {
    return this.http.get<Training[]>(environment.host + "/trainings/category/" + id);
  }

  public getCategories() {
    return this.http.get<Category[]>(environment.host + "/category")
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
    return this.http.delete(environment.host + "/trainings/" + id)
  }

  public saveCustomer(customer: Customer) {
    return this.http.post<Customer>(environment.host + "/customers", customer).subscribe({
      next: response => {
        console.log("Customer ajouté avec succès :", response);
      },
      error: error => {
        console.error("Une erreur s'est produite lors de l'ajout du customer :", error);
        this.errorService.setError("Une erreur s'est produite lors de la création du customer.");
      }
    });
  }

  public saveOrder(order: Order) {
    return this.http.post<Order>(environment.host + "/orders", order).subscribe({
      next: response => {
        console.log("Commande ajoutée avec succès :", response);
      },
      error: error => {
        console.error("Une erreur s'est produite lors de l'ajout de la commande :", error);
        this.errorService.setError("Une erreur s'est produite lors de la création de la commande.");
      }
    });
  }
}
