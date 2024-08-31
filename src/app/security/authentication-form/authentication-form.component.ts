import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CredentialsUserDto } from '../../services/interfaces';
import { ShowErrorsComponent } from "../../shared/components/show-errors/show-errors.component";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [ShowErrorsComponent, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css'
})
export class AuthenticationFormComponent {
  private formBuilder = inject(FormBuilder);  

  form = this.formBuilder.group({
    email: ['', {validators: [Validators.required, Validators.email]}],
    password: ['', {validators: [Validators.required]}]
  })

  @Input({required: true})
  title: string='Login';

  @Input()
  errors: string[] = [];

  @Output()
  postForm = new EventEmitter<CredentialsUserDto>();

  getMessagesErrorEmail(): string{
    let field = this.form.controls.email;

    if (field.hasError('required')){
      return 'The field email is required';
    }

    
    if (field.hasError('email')){
      return 'The email is not valid';
    }

    return '';
  }

  getMessagesErrorPassword(): string{
    let field = this.form.controls.password;

    if (field.hasError('required')){
      return 'The field password is required';
    }

    return '';
  }

  save(){
    if (!this.form.valid){
      return;
    }

    const credentials = this.form.value as CredentialsUserDto;
    this.postForm.emit(credentials);
  }
}
