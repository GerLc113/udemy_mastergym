import { DocumentReference } from "@angular/fire/firestore";
import { Cliente } from "./cliente";
import { Precio } from "./precio";

export interface Inscripcion {
  id?: string;
  fecha_inicial: any;
  fecha_final: any;
  cliente: DocumentReference;
  cliente_data?: Cliente; 
  precio: DocumentReference;
  precio_data?: Precio;
  subtotal: number;
  iva: number;
  total: number;
}