import { DocumentReference } from "@angular/fire/firestore";

export interface Cliente{
  id: string;
  nombre: string;
  nombre_completo?: string;
  apellido: string;
  correo: string;
  ine: string;
  telefono: number;
  fecha_nacimiento: any;
  imagen: string;
  ref?: DocumentReference;
}