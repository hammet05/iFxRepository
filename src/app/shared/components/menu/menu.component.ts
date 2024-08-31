import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthorizedFormComponent } from "../../../security/authorized-form/authorized-form.component";
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, AuthorizedFormComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
  securytyService = inject(SecurityService);
}
