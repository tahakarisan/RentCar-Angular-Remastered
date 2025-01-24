import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { CarDetail } from '../../models/carDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
 carDetails:CarDetail[]=[];
 url = "https://localhost:44398/Images/";
 constructor(private carService:CarService , private activatedRoute:ActivatedRoute){};
 ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
    if(params["carId"]){
      return this.getCarDetailByCarId(params["carId"]);
    }

   })
 };
 
 getCarDetailByCarId(carId:number){
  this.carService.getCarDetailByCarId(carId).subscribe(response=>{
    this.carDetails=response.data;
  })
 }
 
}
