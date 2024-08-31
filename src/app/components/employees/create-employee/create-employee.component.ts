import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { EntityService } from '../../../services/entity.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup;
  employeeService = inject(EmployeeService);
  router = inject(Router);
  
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      identificationType: [0, Validators.required],
      positionId: [0, Validators.required],
      identificationNumber: ['', [Validators.required, Validators.maxLength(20)]],
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this.employeeService.save(this.employeeForm.value)
    .subscribe({
      next: () => {
        this.router.navigate(['/employees'])
      },
      error: err => {
        console.log(err);        
      }
    })
    } else {
      console.log('Form is invalid');
    }
  }

}
