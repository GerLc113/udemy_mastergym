import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from "../../../services/mensajes/mensajes.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Duracion } from "../../../models/duracion";
import { DuracionesService } from "../../../services/duraciones/duraciones.service";

@Component({
  selector: 'app-editar-precio',
  templateUrl: './editar-precio.component.html',
  styleUrls: ['./editar-precio.component.css']
})
export class EditarPrecioComponent implements OnInit {
  form_precio: FormGroup;
  id_precio: string;
  duraciones: Duracion[] = [];

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private afs: AngularFirestore,
    private mensaje: MensajesService, private spinner: NgxSpinnerService, private location: Location,
    private duracionServicio: DuracionesService) { }

  ngOnInit(): void {
    this.obtenDuraciones();
    this.id_precio = this.activeRoute.snapshot.params.id;
    this.iniciaFormulario();
    this.obtenPrecio(this.id_precio);
  }

  obtenDuraciones(): void {
    this.duraciones = this.duracionServicio.obtenDuraciones();
  }

  obtenPrecio(id: string): void {
    this.afs.doc<any>('precios/' + id).valueChanges().subscribe((precio) => {
      this.form_precio.setValue({
        nombre: precio.nombre,
        costo: precio.costo,
        duracion: precio.duracion,
        tipo: precio.tipo
      });
    });
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
    this.afs.doc('precios/' + this.id_precio).update(this.form_precio.value).then((respuestaPrecio) => {
      this.mensaje.mensajeExito('Precio modificado correctamente');
      this.spinner.hide();
    }).catch((error) => {
      this.spinner.hide();
      this.mensaje.mensajeError('No se pudo modificar el precio');
    });
  }

  regresar(): void {
    this.location.back();
  }

}
