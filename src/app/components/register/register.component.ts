import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  securityService = inject(SecurityService);
  router = inject(Router);
  errores: string[]=[];
  
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.securityService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/employees'])
        },
        error: err => {
          console.log(err);        
        }
      })
    }
  }
}
