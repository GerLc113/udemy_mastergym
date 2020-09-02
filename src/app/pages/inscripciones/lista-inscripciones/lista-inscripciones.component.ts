import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from "../../../services/inscripciones/inscripciones.service";
import { Inscripcion } from "../../../models/inscripcion";

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  filtro: string;

  constructor(private inscripcionServicio: InscripcionesService) { }

  ngOnInit(): void {
    this.obtenInscripciones();
  }

  obtenInscripciones(): void {
    this.inscripciones = this.inscripcionServicio.obtenInscripciones();
  }

}
