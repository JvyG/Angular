import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../../rest.service';
import { MatPaginator, MatTableDataSource} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarComponent } from '../editar/editar.component';

@Component({
  selector: 'basic-bootstrap-theme-demo',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  entryComponents: [ EditarComponent ]
})

export class ConsultarComponent implements OnInit {

  constructor(public rest:RestService, private modalService: NgbModal) { }
    pacientes : MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    itemsPerPage = 4;
    page : number = 1;
    currentPage = 1;
    pageEvent: number = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    displayedColumns: string[] = ["indice", "nombre", "apellido", "codigo postal", "correo", "direccion", "pais", "estado", "ciudad", "opciones"];
    columnas = [
      {prop : "idu_paciente", name: "#"},
      {prop : "nombre", name : "Nombre"},
      {prop : "apellido", name : "Apellido"},
      {prop : "codigo_postal", name: "Codigo"},
      {prop : "correo", name: "Correo"},
      {prop : "direccion", name: "Dirección"},
      {prop : "nom_pais", name: "País"},
      {prop : "nom_estado", name: "Estado"},
      {prop : "nom_ciudad", name: "Ciudad"}
    ];

  ngOnInit() {
    this.consultarPacientes();
  }

  consultarPacientes() {
    this.rest.consultarPacientes().subscribe(res => {
      this.pacientes = new MatTableDataSource(res.data);
      this.pacientes.paginator = this.paginator;  
    })
  }
  editarPaciente(iduPaciente: number) {
    const editarModal = this.modalService.open(EditarComponent, { size: 'lg' });
    editarModal.componentInstance.idPaciente = iduPaciente;
  }

}
