import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente";
import { ClientesService } from "../../../services/clientes/clientes.service";

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: Cliente[];
  filtro: string;

  constructor(private clienteServicio: ClientesService) { }

  ngOnInit(): void {
    this.obtenClientes();
  }

  obtenClientes(): void {
    this.clientes = this.clienteServicio.obtenClientes();
  }

}
