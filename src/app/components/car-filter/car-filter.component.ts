import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { parseTemplate } from '@angular/compiler';
import { response } from 'express';
import { ShareService } from '../../services/share.service';
import { share } from 'rxjs';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrl: './car-filter.component.css'
})
export class CarFilterComponent implements OnInit{
  cars:Car[]=[];
  brandFilter:number|null=null;
  colorFilter:number|null=null;
  
  brands:Brand[]=[];
  colors:Color[]=[];

  constructor(private carService:CarService,private brandService:BrandService, private activatedRoute:ActivatedRoute,private shareService:ShareService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]&&params["colorId"]){
        this.carService.filterCar(params["brandId"],params["colorId"])
        console.log("a")
      }
    })
    
    this.shareService.brandFilterId.subscribe((brandId)=>{
      console.log(brandId);
      this.brandFilter=brandId;
    })
    this.shareService.colorFilterId.subscribe((colorId)=>{
      console.log(colorId);
      this.colorFilter=colorId;
    })
    
  }

  getColorById(colorId:number){
    this.carService.getByColorId(colorId).subscribe(response=>{
       this.colors=response.data
    })
  }
  getBrandById(brandId:number){
    this.carService.getByColorId(brandId).subscribe(response=>{
       this.brands=response.data
    })
  }

  filterCars(brandId:number,colorId:number){
    this.carService.filterCar(brandId,colorId).subscribe(response=>{
      this.cars=response.data
    })
  }
  getBrandName(brandFilter:number|null){
    if(brandFilter!=null)
    {this.carService.getByColorId(brandFilter).subscribe(response=>{
      this.brands=response.data
    })}
    
  }
  getColorName(colorFilter:number|null){
    if(colorFilter!=null){
      this.carService.getByColorId(colorFilter).subscribe(response=>{
        this.brands=response.data
     })
    }
  }
  


}
