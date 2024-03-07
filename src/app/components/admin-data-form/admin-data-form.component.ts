import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-data-form',
  templateUrl: './admin-data-form.component.html',
  styleUrls: ['./admin-data-form.component.css']
})
export class AdminDataFormComponent implements OnInit {
  myForm : FormGroup;
  
  constructor(private formBuilder : FormBuilder) {
    this.myForm = this.formBuilder.group({
      name : ['', [Validators.required, Validators.maxLength(30)]],
      description : ['', [Validators.required, Validators.maxLength(50)]],
      price : ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
   }

  ngOnInit(): void {
  }

}
