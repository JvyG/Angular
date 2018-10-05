import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})
export class AltasComponent implements OnInit {

  registroForm: FormGroup;
  submitted = false;
  paises = null;
  estados = null;
  ciudades = null;
  pacientes = null;

  constructor(public rest:RestService, private formBuilder: FormBuilder) { 
  }

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
    this.obtenerPaises();
  }
  obtenerPaises() {
    this.rest.obtenerPaises().subscribe(res => {
      this.paises = res.data;
    });
  }
  obtenerEstados() {
    this.rest.obtenerEstados(this.registroForm.value.idPais).subscribe(res => {
      this.estados = null;
      this.ciudades = null;
      this.estados = res.data;
      this.registroForm.get('idEstado').setValue(""); 
      this.registroForm.get('idCiudad').setValue("");
    });
  }
  obtenerCiudades() {
    this.ciudades = null;
    this.registroForm.get('idCiudad').setValue("");
    let idEstado = this.registroForm.value.idEstado;
    let idPais = this.registroForm.value.idPais;
    this.rest.obtenerCiudades(idPais, idEstado).subscribe(res => {
      this.ciudades = res.data;
    });
  }
  altasPacientes() {
    let datos = this.registroForm.value;
    this.rest.altasPacientes(datos).subscribe(res => {location.reload();});
    
  }
  onSubmit() {
    this.submitted = true;
      if (!this.registroForm.invalid) {
        this.altasPacientes();
      } else{
        return;
      }
  }
  get f() { return this.registroForm.controls; }

}
