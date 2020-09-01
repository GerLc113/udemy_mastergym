import { DocumentReference } from "@angular/fire/firestore";

export interface Inscripcion {
  fecha_inicial: Date;
  fecha_final: Date;
  cliente: DocumentReference;
  precio: DocumentReference;
  subtotal: number;
  iva: number;
  total: number;
}