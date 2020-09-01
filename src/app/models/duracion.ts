import { DocumentReference } from "@angular/fire/firestore";

export interface Duracion {
  id: number;
  duracion: string;
  ref?: DocumentReference;
}