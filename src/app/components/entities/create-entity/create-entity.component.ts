import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EntityService } from '../../../services/entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-entity',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,MatFormFieldModule,ReactiveFormsModule,NgIf,],
  templateUrl: './create-entity.component.html',
  styleUrl: './create-entity.component.css'
})
export class CreateEntityComponent {
  entityForm: FormGroup;
  entityService = inject(EntityService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      idNumber: ['', Validators.required],
      entityName: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });    
  }

  onSubmit() {
    if (this.entityForm.valid) {
      console.log(this.entityForm.value);
      this.entityService.save(this.entityForm.value)
    .subscribe({
      next: () => {
        this.router.navigate(['/entities'])
      },
      error: err => {
        console.log(err);        
      }
    })
    }

  }
}
