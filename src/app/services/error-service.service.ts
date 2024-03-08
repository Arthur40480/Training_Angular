import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {
  private errorMsg : String | null = null;

  constructor() { }

  /**
   * Récupère le message d'erreur
   * @param message 
   */
  setError(message : String) {
    this.errorMsg = message;
  }

  /**
   * Retourne le message d'erreur
   * @returns String ou null
   */
  getError() : String | null {
    return this.errorMsg;
  }

  /**
   * Supprime le message d'erreur
   */
  clearError() {
    this.errorMsg = null;
  }
}
