import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-data-form',
  templateUrl: './admin-data-form.component.html',
  styleUrls: ['./admin-data-form.component.css']
})
export class AdminDataFormComponent implements OnInit {
  myForm : FormGroup;

  constructor(private formBuilder : FormBuilder, private apiService : ApiService) {
    this.myForm = this.formBuilder.group({
      name : ['', [Validators.required, Validators.maxLength(30)]],
      description : ['', [Validators.required, Validators.maxLength(50)]],
      price : ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
   }

  ngOnInit(): void {
  }

  /**
   * Fonction pour créer une formation
   */
  createTraining() {
    this.apiService.addTraining(new Training(this.myForm.value.name, this.myForm.value.description, this.myForm.value.price));
  }
}
