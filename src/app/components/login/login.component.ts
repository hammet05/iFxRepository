import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { CredentialsUserDto } from '../../services/interfaces';
import { Router, RouterLink } from '@angular/router';
import { SecurityService } from '../../services/security.service';
import { AuthenticationFormComponent } from "../../security/authentication-form/authentication-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  securityService = inject(SecurityService);
  router = inject(Router);
  errores: string[]=[];

  save(credenciales: CredentialsUserDto){
    this.securityService.login(credenciales)
    .subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: err => {
        const errors = extractErrorsIdentity(err);
        //this.errores = errors;
      }
    })
  }

 




}
function extractErrorsIdentity(err: any) {
  throw new Error('Function not implemented.');
}

