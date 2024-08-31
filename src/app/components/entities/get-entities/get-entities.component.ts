import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EntityService } from '../../../services/entity.service';
import { PaginationDTO } from '../../../shared/models/paginationDto';
import { NgFor } from '@angular/common';
import { EntityDTO } from '../entities';

@Component({
  selector: 'app-get-entities',
  standalone: true,
  imports: [RouterLink,MatTableModule,MatPaginatorModule,NgFor],
  templateUrl: './get-entities.component.html',
  styleUrl: './get-entities.component.css'
})
export class GetEntitiesComponent implements OnInit{
  entities!: any[];

  entityService = inject(EntityService);

  ngOnInit(): void {
    this.loadRecords();       
  }
  
  

  columnasToShow = ['idNumber','entityName','location','phoneNumber'];
  totalRecords!: number;
  pagination: PaginationDTO = {page: 1, recordsByPage: 10};

  updatePagination(datos: PageEvent){
    this.pagination = {page: datos.pageIndex + 1, recordsByPage: datos.pageSize};
    this.loadRecords();
  }

  loadRecords(){
    this.entityService.crearGet().subscribe(response => {
     console.log(response);
     
      // let entity: EntityDTO;
      // entity={
      //   idNumber: response.idNumber,
      //   // identificationTypeId: 2,
      //   // entityTypeId: 1,
      //   entityName: response.entityName,
      //   location: response.location,
      // phoneNumber: response.phoneNumber
      // }
      

       
     //  const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
     //  this.cantidadTotalRegistros = parseInt(cabecera, 10);
   })
 }
}
