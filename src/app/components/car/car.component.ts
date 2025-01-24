import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from '../../models/carImage';
import { Color } from '../../models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {
    
  cars:Car[]=[];
  colors:Color[]=[];
  carImages:CarImage[]=[];
  searchText:"";
  url = "https://localhost:44398/Images/";
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute){
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      
       if(params["brandId"]){
        this.getCarByBrand(params["brandId"])
        console.log("b")
      }
      else if(params["colorId"]){
        this.getCarByColor(params["colorId"])
        console.log("c")
      }
      else{
        this.getCars();
        this.getAllImage();
        console.log("x");
      }
    })
  }
  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
    })
  }
  getCarByBrand(brandId:number){
    this.carService.getCarByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getAllImage(){
    this.carService.getAllImage().subscribe(response=>{
      this.carImages=response.data;
    })
  }
  getCarByColor(colorId:number){
    this.carService.getByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getCarImageByCarId(carId:number){
    this.carService.getCarImageByCarId(carId).subscribe(response=>{
      this.carImages=response.data
    })
  }
  filterCar(brandId:number,colorId:number){
    this.carService.filterCar(brandId,colorId).subscribe(response=>{
      this.cars=response.data
      console.log("çalıştı")
    })
  }
}
