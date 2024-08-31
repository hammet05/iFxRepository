import { Component, inject, Input } from '@angular/core';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-authorized-form',
  standalone: true,
  imports: [],
  templateUrl: './authorized-form.component.html',
  styleUrl: './authorized-form.component.css'
})
export class AuthorizedFormComponent {
  securityService = inject(SecurityService);
  @Input() rol?: string;

  isAuthorized(): boolean{
    if (this.rol) {
      return this.securityService.getRol()===this.rol;
    } else {
      return this.securityService.isLoggedIn();
    }
    
  }
}
