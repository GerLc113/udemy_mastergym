import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private toastr: ToastrService) { }

  mensajeExito(mensaje: string): void{
    this.toastr.success(mensaje, 'Genial', {
      positionClass: 'toast-bottom-right',
      timeOut: 5000
    });
  }

  mensajeError(mensaje: string): void{
    this.toastr.error(mensaje, 'Oops, Error', {
      positionClass: 'toast-bottom-right',
      timeOut: 5000
    });
  }

  mensajeAlerta(mensaje: string): void{
    this.toastr.warning(mensaje, 'Espera', {
      positionClass: 'toast-bottom-right',
      timeOut: 5000
    });
  }

  mensajeInfo(mensaje: string): void{
    this.toastr.info(mensaje, 'Mira', {
      positionClass: 'toast-bottom-right',
      timeOut: 5000
    });
  }
}

