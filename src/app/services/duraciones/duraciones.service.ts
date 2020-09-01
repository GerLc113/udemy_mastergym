import { Injectable } from '@angular/core';
import { Duracion } from "../../models/duracion";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DuracionesService {
  duraciones: Duracion[] = [];

  constructor(private afs: AngularFirestore) {
   }

  obtenDuraciones(): Duracion[] {
    this.duraciones = [];
    this.afs.collection('duraciones').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let duracion = item.data() as Duracion;
        duracion.id = parseInt(item.id);
        duracion.ref = item.ref;
        this.duraciones.push(duracion);
      });
    });
    return this.duraciones;
  }

}
