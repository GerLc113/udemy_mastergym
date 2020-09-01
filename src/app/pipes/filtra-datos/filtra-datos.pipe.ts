import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraDatos'
})
export class FiltraDatosPipe implements PipeTransform {

  transform(datos: any, filter: any, isAnd: boolean): any {
    if (filter.nombre && Array.isArray(datos)) {
      const filterKeys = Object.keys(filter);
      if (isAnd) {
        return datos.filter(item =>
          filterKeys.reduce((memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
      } else {
        return datos.filter(item => {
          return filterKeys.some((keyName) => {
            if (filter[keyName]) {
              const fil = filter[keyName].split(' ');
              let check = false;
              for (const f of fil) {
                if (new RegExp(f, 'gi').test(item[keyName]) || f === '') {
                  check = true;
                } else {
                  check = false;
                  break;
                }
              }
              return check;
            } else {
              return true;
            }
          });
        });
      }
    } else {
      return datos;
    }
  }

}
