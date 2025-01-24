import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'transformBrand'
})
export class TransformBrandPipe implements PipeTransform {

  transform(value: Brand[], brandId:number|null): any {

    let brand = value.find(v=>v.id==brandId);
    return brand?.brandName;
  }

}
