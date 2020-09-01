import { Component, OnInit } from '@angular/core';
import { Precio } from "../../../models/precio";
import { Duracion } from "../../../models/duracion";
import { PreciosService } from "../../../services/precios/precios.service";
import { DuracionesService } from "../../../services/duraciones/duraciones.service";

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  precios: Precio[] = [];
  duraciones: Duracion[] = [];
  filtro: string;

  constructor(private precioServicio: PreciosService, private duracionServicio: DuracionesService) { }

  ngOnInit(): void {
    this.obtenDuraciones();
    this.obtenPrecios();
  }

  obtenDuraciones(): void {
    this.duraciones = this.duracionServicio.obtenDuraciones();
  }

  obtenPrecios(): void {
    this.precios = this.precioServicio.obtenPrecios();
  }

}