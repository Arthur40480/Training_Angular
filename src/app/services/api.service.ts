import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http:HttpClient) { }

  public getTrainings() {
    return this.http.get<Training[]>(environment.host + "/trainings");
  }

  getTraining(id : number) {
    return this.http.get<Training>(environment.host + "/trainings/" + id);
  }

  public getUsers() {
    return this.http.get<User[]>(environment.host + "/users")
  }
}
