import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from "../../../services/mensajes/mensajes.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  form_nuevo_cliente: FormGroup;
  imagen_cliente: File = null;
  porcentaje_imagen: number = 0;
  subiendo_imagen: boolean = false;

  @ViewChild('inputImagen')
  inputImagen: ElementRef;

  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private afs: AngularFirestore,
    private spinner: NgxSpinnerService, private mensaje: MensajesService, private location: Location) { }

  ngOnInit(): void {
    this.iniciaFormulario();
  }

  iniciaFormulario(): void {
    this.form_nuevo_cliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      ine: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  uploadFile(event): void {
    if (event.target.files) {
      this.imagen_cliente = event.target.files[0];
      if (this.imagen_cliente.size > 4000000) {
        this.mensaje.mensajeError('La imagen pesa más de 5Mb');
        this.resetImagen();
      }
    }
  }

  enviar(): void {
    this.spinner.show();
    this.subiendo_imagen = true;
    let fecha = new Date().getTime().toString();
    let extension = this.imagen_cliente.name.toString().substring(this.imagen_cliente.name.toString().lastIndexOf('.'));
    const filePath = 'clientes/' + fecha + extension;
    const ref = this.storage.ref(filePath);
    const task = ref.put(this.imagen_cliente);
    task.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje_imagen = parseInt(porcentaje.toString());
    });
    task.then((respuestaImagen) => {
      ref.getDownloadURL().subscribe((url) => {
        this.form_nuevo_cliente.value.imagen = url;
        this.form_nuevo_cliente.value.fecha_nacimiento = new Date(this.form_nuevo_cliente.value.fecha_nacimiento);
        this.afs.collection('clientes').add(this.form_nuevo_cliente.value).then((respuestaCliente) => {
          this.resetImagen();
          this.form_nuevo_cliente.reset();
          this.mensaje.mensajeExito('Cliente dado de alta correctamente');
          this.subiendo_imagen = false;
          this.spinner.hide();
        }).catch((error) => {
          this.mensaje.mensajeError('No se pudo dar de alta al cliente');
          this.subiendo_imagen = false;
          this.spinner.hide();
        });
      });
    });
  }

  resetImagen(): void {
    this.inputImagen.nativeElement.value = "";
    this.imagen_cliente = null;
    this.form_nuevo_cliente.controls.imagen.setValue('');
    this.porcentaje_imagen = 0;
  }

  regresar(): void {
    this.location.back();
  }

}
