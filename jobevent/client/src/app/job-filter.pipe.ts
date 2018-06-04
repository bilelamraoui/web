import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobFilter'
})
export class JobFilterPipe implements PipeTransform {

  newArray = [];

  transform(array: any[], searchText: string[]): any[] {
    if (!array) return [];
    if (!searchText[0] && !searchText[1]) return array;

    searchText[0] = searchText[0].toLowerCase();
    searchText[1] = searchText[1].toLowerCase();
    
    return array.filter( it => {
      if (searchText[0]) {
        return it.ville.toLowerCase().includes(searchText[0]);
      }
      if (searchText[1]) {
        return it.poste.toLowerCase().includes(searchText[1]);
      }
    });
   }
  }


