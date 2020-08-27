import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from "../../../services/mensajes/mensajes.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  form_cliente: FormGroup;
  imagen_cliente: File = null;
  url_imagen: string;
  porcentaje_imagen: number = 0;
  subiendo_imagen: boolean = false;
  id_cliente: string;

  @ViewChild('inputImagen')
  inputImagen: ElementRef;

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private storage: AngularFireStorage,
    private afs: AngularFirestore, private mensaje: MensajesService, private spinner: NgxSpinnerService, private location: Location) { }

  ngOnInit(): void {
    this.id_cliente = this.activeRoute.snapshot.params.id;
    this.iniciaFormulario();
    this.obtenCliente(this.id_cliente);
  }

  obtenCliente(id: string): void {
    this.afs.doc<any>('clientes/' + id).valueChanges().subscribe((cliente) => {
      this.form_cliente.setValue({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
        ine: cliente.ine,
        telefono: cliente.telefono,
        fecha_nacimiento: new Date(cliente.fecha_nacimiento.seconds * 1000).toISOString().substr(0, 10),
        imagen: ''
      });
      this.url_imagen = cliente.imagen;
    });
  }

  iniciaFormulario(): void {
    this.form_cliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      ine: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      imagen: ['']
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

  resetImagen(): void {
    this.inputImagen.nativeElement.value = "";
    this.imagen_cliente = null;
    this.form_cliente.controls.imagen.setValue('');
    this.porcentaje_imagen = 0;
  }

  enviar(): void {
    this.spinner.show();
    if (this.imagen_cliente) {
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
          this.form_cliente.value.imagen = url;
          this.form_cliente.value.fecha_nacimiento = new Date(this.form_cliente.value.fecha_nacimiento);
          this.afs.doc('clientes/' + this.id_cliente).update(this.form_cliente.value).then((respuestaCliente) => {
            this.resetImagen();
            this.mensaje.mensajeExito('Cliente modificado correctamente');
            this.subiendo_imagen = false;
            this.spinner.hide();
          }).catch((error) => {
            this.spinner.hide();
            this.subiendo_imagen = false;
            this.mensaje.mensajeError('No se pudo modificar el cliente');
          });
        });
      });
    }
    else {
      this.form_cliente.value.imagen = this.url_imagen;
      this.form_cliente.value.fecha_nacimiento = new Date(this.form_cliente.value.fecha_nacimiento);
      this.afs.doc('clientes/' + this.id_cliente).update(this.form_cliente.value).then((respuestaCliente) => {
        this.mensaje.mensajeExito('Cliente modificado correctamente');
        this.spinner.hide();
      }).catch((error) => {
        this.spinner.hide();
        this.mensaje.mensajeError('No se pudo modificar el cliente');
      });
    }
  }

  regresar(): void {
    this.location.back();
  }

}
