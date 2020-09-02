import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from "../../models/inscripcion";
import { Cliente } from "../../models/cliente";
import { Precio } from "../../models/precio";

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  inscripciones: Inscripcion[] = [];

  constructor(private afs: AngularFirestore) { }

  obtenInscripciones(): Inscripcion[] {
    this.inscripciones = [];
    this.afs.collection('inscripciones').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let inscripcion = item.data() as Inscripcion;
        inscripcion.id = item.id;
        inscripcion.fecha_inicial = new Date(inscripcion.fecha_inicial.seconds * 1000).toISOString().substr(0, 10);
        inscripcion.fecha_final = new Date(inscripcion.fecha_final.seconds * 1000).toISOString().substr(0, 10);
        this.afs.doc(inscripcion.cliente.path).get().subscribe((cliente) => {
          inscripcion.cliente_data = cliente.data() as Cliente;
        });
        this.afs.doc(inscripcion.precio.path).get().subscribe((precio) => {
          inscripcion.precio_data = precio.data() as Precio;
        });
        this.inscripciones.push(inscripcion);
      });
    });
    return this.inscripciones;
  }

}
