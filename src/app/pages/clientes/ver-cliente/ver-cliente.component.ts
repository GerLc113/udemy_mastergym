import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from "../../../models/cliente";

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})
export class VerClienteComponent implements OnInit {
  id_cliente: string;
  cliente: Cliente;

  constructor(private activeRoute: ActivatedRoute, private location: Location, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.id_cliente = this.activeRoute.snapshot.params.id;
    this.iniciaCliente();
    this.obtenCliente(this.id_cliente);
  }

  iniciaCliente(): void {
    this.cliente = {
      id: '',
      nombre: '',
      apellido: '',
      correo: '',
      ine: '',
      telefono: 0,
      fecha_nacimiento: '',
      imagen: ''
    };
  }

  regresar(): void {
    this.location.back();
  }

  obtenCliente(id: string): void {
    this.afs.doc<Cliente>('clientes/' + id).valueChanges().subscribe((cliente) => {
      this.cliente = cliente;
      this.cliente.id = this.id_cliente;
      this.cliente.fecha_nacimiento = new Date(this.cliente.fecha_nacimiento.seconds * 1000).toISOString().substr(0, 10);
    });
  }

}
