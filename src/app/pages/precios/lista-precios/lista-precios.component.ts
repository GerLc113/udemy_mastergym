import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  precios: any[] = new Array<any>();
  precios_filtro: any[];
  duraciones: any[] = new Array<any>();

  constructor(firestore: AngularFirestore) {
    firestore.collection('duraciones').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let duracion = item.data();
        duracion.id = item.id;
        duracion.ref = item.ref;
        this.duraciones.push(duracion);
      });
    });

    firestore.collection('precios').get().subscribe((respuesta) => {
      respuesta.docs.forEach((item) => {
        let precio = item.data();
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      });
      this.precios_filtro = this.precios.slice();
    });
   }

  ngOnInit(): void {
  }

  filtrarPrecios(filtro: string): void {
    this.precios = this.precios_filtro.filter(precio => {
      return precio.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    });
  }

}
