import { DocumentReference } from "@angular/fire/firestore";

export interface Precio{
  id: string;
  nombre: string;
  costo: number;
  duracion: number;
  tipo: string;
  ref?: DocumentReference;
}