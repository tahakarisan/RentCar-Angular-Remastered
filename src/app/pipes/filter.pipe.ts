import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Car[], searchText: string): Car[] {
    searchText:searchText?searchText.toLocaleLowerCase:"";
    return searchText? value.filter(value=>value.description.toLocaleLowerCase().indexOf(searchText)!==-1):value;
  }

}