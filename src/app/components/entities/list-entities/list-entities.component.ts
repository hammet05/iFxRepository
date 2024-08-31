import { Component, inject, Input } from '@angular/core';
import { GenericListComponentComponent } from "../../generic-list-component/generic-list-component.component";
import { EntityService } from '../../../services/entity.service';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { PaginationDTO } from '../../../shared/models/paginationDto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-entities',
  standalone: true,
  imports: [GenericListComponentComponent,RouterLink,MatTableModule,MatPaginatorModule],
  templateUrl: './list-entities.component.html',
  styleUrl: './list-entities.component.css'
})
export class ListEntitiesComponent {
  @Input({ required: true })
  entities!: any[];

  entityService = inject(EntityService);

  columnasToShow = ['name', 'actions'];
  totalRecords!: number;
  pagination: PaginationDTO = {page: 1, recordsByPage: 10};

  updatePagination(datos: PageEvent){
    this.pagination = {page: datos.pageIndex + 1, recordsByPage: datos.pageSize};
    this.loadRecords();
  }
  
  loadRecords(){
     this.entityService.crearGet()
     .subscribe(response => {
      console.log(response);
      //  this.usuarios = respuesta.body as UsuarioDTO[];
      //  const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      //  this.cantidadTotalRegistros = parseInt(cabecera, 10);
    })
  }
}
