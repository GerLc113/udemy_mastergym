import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from "../../../services/mensajes/mensajes.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-agregar-precio',
  templateUrl: './agregar-precio.component.html',
  styleUrls: ['./agregar-precio.component.css']
})
export class AgregarPrecioComponent implements OnInit {
  duraciones: any[] = new Array<any>();
  form_precio: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, private spinner: NgxSpinnerService,
    private mensaje: MensajesService, private location: Location) {
    afs.collection('duraciones').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let duracion = item.data();
        duracion.id = item.id;
        duracion.ref = item.ref;
        this.duraciones.push(duracion);
      });
    });
   }

  ngOnInit(): void {
    this.iniciaFormulario();
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
