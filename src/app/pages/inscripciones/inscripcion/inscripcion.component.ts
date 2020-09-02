import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente";
import { ClientesService } from "../../../services/clientes/clientes.service";
import { Precio } from "../../../models/precio";
import { PreciosService } from "../../../services/precios/precios.service";
import { Inscripcion } from "../../../models/inscripcion";
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajesService } from "../../../services/mensajes/mensajes.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {
  clientes: Cliente[];
  precios: Precio[] = [];
  filtro: string;
  cliente_select: Cliente;
  precio_select: Precio;
  inscripcion: Inscripcion;
  iva: number = 0.16;

  constructor(private clienteServicio: ClientesService, private precioServicio: PreciosService, private spinner: NgxSpinnerService,
    private mensaje: MensajesService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.obtenClientes();
    this.obtenPrecios();
    this.inscripcion = {
      fecha_inicial: null,
      fecha_final: null,
      cliente: null,
      precio: null,
      subtotal: 0,
      iva: 0,
      total: 0
    };
  }

  obtenClientes(): void {
    this.clientes = this.clienteServicio.obtenClientes();
  }

  obtenPrecios(): void {
    this.precios = this.precioServicio.obtenPrecios();
  }

  seleccionaCliente(cliente): void {
    this.cliente_select = cliente;
    this.inscripcion.cliente = cliente.ref;
  }

  seleccionaPrecio(id): void {
    if (id != '0') {
      this.iniciaInscripcion(id);
    }
    else {
      this.reset();
    }
  }

  iniciaInscripcion(id: string): void {
    let dias: number;
    this.precio_select = this.precios.find(precio => precio.id == id);
    this.inscripcion.precio = this.precio_select.ref;
    this.inscripcion.fecha_inicial = new Date();
    switch (this.precio_select.tipo) {
      case '1': {
        dias = this.precio_select.duracion * 1;
        break;
      }
      case '2': {
        dias = this.precio_select.duracion * 7;
        break;
      }
      case '3': {
        dias = this.precio_select.duracion * 30;
        break;
      }
      case '4': {
        dias = this.precio_select.duracion * 365;
        break;
      }
      default: {
        dias = 0;
        break;
      }
    }
    this.inscripcion.fecha_final = new Date(this.inscripcion.fecha_inicial.getFullYear(), this.inscripcion.fecha_inicial.getMonth(),
      this.inscripcion.fecha_inicial.getDate() + dias);
    this.inscripcion.subtotal = this.precio_select.costo;
    this.inscripcion.iva = this.inscripcion.subtotal * this.iva;
    this.inscripcion.total = this.inscripcion.subtotal + this.inscripcion.iva;
  }

  guardaInscripcion(): void {
    this.spinner.show();
    this.afs.collection('inscripciones').add(this.inscripcion).then((respuestaInscripcion) => {
      this.reset();
      this.cliente_select = undefined;
      this.mensaje.mensajeExito('Inscripción guardada correctamente');
      this.spinner.hide();
    }).catch((error) => {
      this.mensaje.mensajeError('No se pudo guardar la inscripción');
      this.spinner.hide();
    });
  }

  reset(): void {
    this.precio_select = undefined;
    this.inscripcion = {
      fecha_inicial: null,
      fecha_final: null,
      cliente: null,
      precio: null,
      subtotal: 0,
      iva: 0,
      total: 0
    };
  }

}
