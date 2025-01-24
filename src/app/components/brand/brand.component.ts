import { Component, numberAttribute, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { response} from 'express';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Color } from '../../models/color';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit{
    
    brands:Brand[]=[];
    colors:Color[]=[];
    currentBrand:Brand|null=null;
    constructor(private brandService:BrandService,private carService:CarService,private shareService:ShareService){}
    ngOnInit(): void {
      this.getBrands();
    }
    getBrands(){
      this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data
      })
    }

    

    setBrandFilterId(brandId:number){
      this.shareService.setBrandFilter(brandId);
    }

    setCurrentBrand(brand:Brand|null){
      this.currentBrand=brand
    }
    
    getCurrentBrandClass(brand:Brand){
       if(brand==this.currentBrand){
        return "list-group-item active"
       }
       else{
        return "list-group-item"
       }
    }
    getAllCurrentBrandClass(){
      if(this.currentBrand==null){
       return "list-group-item active"
      }
      else{
       return "list-group-item"
      }
   }

}
