import { Injectable } from '@angular/core';
import { Cliente } from "../../models/cliente";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  clientes: Cliente[] = [];

  constructor(private afs: AngularFirestore) { }

  obtenClientes(): Cliente[] {
    this.clientes = [];
    this.afs.collection('clientes').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let cliente = item.data() as Cliente;
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.nombre_completo = cliente.nombre + ' ' + cliente.apellido;
        cliente.fecha_nacimiento = new Date(cliente.fecha_nacimiento.seconds * 1000).toISOString().substr(0, 10)
        this.clientes.push(cliente);
      });
    });
    return this.clientes;
  }

}
