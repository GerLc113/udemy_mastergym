import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortaNombre'
})
export class CortaNombrePipe implements PipeTransform {

  transform(titulo: string): string {
    if (titulo.toString().length > 21) {
      titulo = titulo.substr(0, 18) + '...';
    }
    return titulo
  }

}
