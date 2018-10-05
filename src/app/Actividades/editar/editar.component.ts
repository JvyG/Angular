import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  @Input() idPaciente;
  registroForm: FormGroup;
  submitted: boolean = false;
  paises = null;
  estados = null;
  ciudades = null;
  pacientes = null;
  mostrar: boolean = false;

  constructor(private toastr: ToastrService, public rest:RestService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      idPais: ['', Validators.required],
      idEstado: ['', Validators.required],
      idCiudad: ['', Validators.required]
    });

    this.consultarPaciente();
  }
  obtenerPaises() {
    this.rest.obtenerPaises().subscribe(res => {
      this.paises = res.data;
    });
  }
  obtenerEstados(idPais: number, bandera: boolean = false) {
    this.rest.obtenerEstados(idPais).subscribe(res => {
      this.estados = null;
      this.ciudades = null;
      this.estados = res.data;
      if(!bandera){
        this.registroForm.get('idEstado').setValue(""); 
        this.registroForm.get('idCiudad').setValue("");
      }
    });
  }
  obtenerCiudades(idPais: number, idEstado: number, bandera: boolean = false) {
    this.ciudades = null;
    debugger;
    if(!bandera){
      this.registroForm.get('idCiudad').setValue("");
    }
    this.rest.obtenerCiudades(idPais, idEstado).subscribe(res => {
      this.ciudades = res.data;
    });
  }
  consultarPaciente() {
    this.rest.consultarPaciente(this.idPaciente).subscribe(res => {
      debugger;
      let idPais = res.data[0].idu_pais;
      let idEstado = res.data[0].idu_estado;
      this.obtenerPaises();
      this.obtenerEstados(idPais, true);
      this.obtenerCiudades(idPais, idEstado, true);

      this.registroForm.get('nombre').setValue(res.data[0].nombre);
      this.registroForm.get('apellido').setValue(res.data[0].apellido);
      this.registroForm.get('codigoPostal').setValue(res.data[0].codigo_postal);
      this.registroForm.get('correo').setValue(res.data[0].correo);
      this.registroForm.get('direccion').setValue(res.data[0].direccion);
      this.registroForm.get('idPais').setValue(res.data[0].idu_pais);
      this.registroForm.get('idEstado').setValue(res.data[0].idu_estado);
      this.registroForm.get('idCiudad').setValue(res.data[0].idu_ciudad);
    });
  }
  editarPaciente() {
    let datos = this.registroForm.value;
    datos.idPaciente = this.idPaciente;
    this.rest.editarPaciente(datos).subscribe(res => {
      debugger;
      if(res.data.success){
        this.toastr.success('Se ha guardado correctamente!');
      } else {
        this.toastr.success('Hello world!', 'Toastr fun!'); 
      }
    });
    this.mostrar = true;
  }
  onSubmit() {
    this.submitted = true;
      if (!this.registroForm.invalid) {
        this.editarPaciente();
      } else{
        return;
      }
  }
  get f() { return this.registroForm.controls; }
}

export interface IAlert {
  tipo: string;
  mensaje: string;
}