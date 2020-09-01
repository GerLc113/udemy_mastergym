import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from "../../../services/mensajes/mensajes.service";
import { Location } from "@angular/common";
import { Duracion } from "../../../models/duracion";
import { DuracionesService } from "../../../services/duraciones/duraciones.service";

@Component({
  selector: 'app-agregar-precio',
  templateUrl: './agregar-precio.component.html',
  styleUrls: ['./agregar-precio.component.css']
})
export class AgregarPrecioComponent implements OnInit {
  duraciones: Duracion[] = [];
  form_precio: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private spinner: NgxSpinnerService,
    private mensaje: MensajesService, private location: Location, private duracionServicio: DuracionesService) { }

  ngOnInit(): void {
    this.obtenDuraciones();
    this.iniciaFormulario();
  }

  obtenDuraciones(): void {
    this.duraciones = this.duracionServicio.obtenDuraciones();
  }

  iniciaFormulario(): void {
    this.form_precio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  enviar(): void {
    this.spinner.show();
    this.afs.collection('precios').add(this.form_precio.value).then((respuestaPrecio) => {
      this.form_precio.reset();
      this.mensaje.mensajeExito('Precio dado de alta correctamente');
      this.spinner.hide();
    }).catch((error) => {
      this.mensaje.mensajeError('No se pudo dar de alta el precio');
      this.spinner.hide();
    });
  }

  regresar(): void {
    this.location.back();
  }

}
