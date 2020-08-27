import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  clientes_filtro: any[];

  constructor(firestore: AngularFirestore) {
    firestore.collection('clientes').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.nombre_completo = cliente.nombre + ' ' + cliente.apellido;
        cliente.fecha_nacimiento = new Date(cliente.fecha_nacimiento.seconds * 1000).toISOString().substr(0, 10)
        this.clientes.push(cliente);
      });
      this.clientes_filtro = this.clientes.slice();
    });
  }

  ngOnInit(): void {
  }

  filtrarClientes(filtro: string): void {
    this.clientes = this.clientes_filtro.filter(cliente => {
      return cliente.nombre_completo.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    });
  }

}
