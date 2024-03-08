import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  isCreating: boolean = true;
  idTraining: number | undefined;

  constructor() { }

  create(state: boolean) : void {
    this.isCreating = state;
  }

  idTrainingToUpdate(id: number | undefined) : void {
    this.idTraining = id;
  }

  getCreate() : boolean {
    return this.isCreating;
  }

  getidTraining() : number | undefined {
    return this.idTraining;
  }

}
