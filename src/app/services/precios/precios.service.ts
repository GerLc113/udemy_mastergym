import { Injectable } from '@angular/core';
import { Precio } from "../../models/precio";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  precios: Precio[] = [];

  constructor(private afs: AngularFirestore) { }

  obtenPrecios(): Precio[] {
    this.precios = [];
    this.afs.collection('precios').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      });
    });
    return this.precios;
  }

}
