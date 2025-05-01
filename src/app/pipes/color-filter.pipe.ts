import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[], searchText:string): Color[] {
    searchText = searchText ? searchText.toLocaleLowerCase() : "";
    return searchText ? value.filter((color: Color) => color.colorName.toLocaleLowerCase().indexOf(searchText) !== -1) : value;
  }

}
