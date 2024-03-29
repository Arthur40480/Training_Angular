import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-data-form',
  templateUrl: './admin-data-form.component.html',
  styleUrls: ['./admin-data-form.component.css']
})
export class AdminDataFormComponent implements OnInit {
  myForm: FormGroup;
  idTraining : number | undefined;

  constructor(private formBuilder : FormBuilder, private apiService : ApiService, private router : Router, private route : ActivatedRoute) {
    this.myForm = this.formBuilder.group({
      name : ['', [Validators.required, Validators.maxLength(30)]],
      description : ['', [Validators.required, Validators.maxLength(50)]],
      price : ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    this.idTraining = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
  }

  /**
   * Fonction permettant d'apeller soit la méthode pour créer/mettre a jour suivant les params de l'URL
   */
  createOrUpdate() : void {
    if(this.idTraining) {
      this.updateTraining(this.idTraining);
    }else {
      this.createTraining();
    }
  }
   
  /**
   * Fonction pour créer une formation
   */
  createTraining() : void {
    this.apiService.addTraining(new Training(this.myForm.value.name, this.myForm.value.description, this.myForm.value.price));
    this.router.navigateByUrl('admin');
  }

  /**
   * Fonction pour mettre à jour une formation
   */
  updateTraining(id: number | undefined) : void {
    if(id !== undefined) {
      this.apiService.updateTraining(id, new Training(this.myForm.value.name, this.myForm.value.description, this.myForm.value.price));
      this.router.navigateByUrl('admin');
    }
  }
}
