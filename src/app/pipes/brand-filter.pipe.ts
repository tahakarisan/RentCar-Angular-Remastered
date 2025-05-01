import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[], searchText:string): Brand[] {
    searchText = searchText ? searchText.toLocaleLowerCase() : "";
    return searchText ? value.filter((brand: Brand) => brand.brandName.toLocaleLowerCase().indexOf(searchText) !== -1) : value;
  }

}
