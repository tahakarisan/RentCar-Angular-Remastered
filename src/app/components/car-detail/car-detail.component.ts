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
 defaultImage: string = 'b3e07f6e-9be9-48a0-bcaa-fcc0a0ff53f9.jpg';
 constructor(private carService:CarService , private activatedRoute:ActivatedRoute){};
 ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
    if(params["carId"]){
      return this.getCarDetailByCarId(params["carId"]);
    }
   })
 };
 getCarImage(image: string): string {
  return this.url+`${image}`;
}
trackById(index: number, item: any): number {
  return item.id; // Veya benzersiz bir değer
}
 getCarDetailByCarId(carId:number){
  this.carService.getCarDetailByCarId(carId).subscribe(response=>{
    this.carDetails=response.data;
    console.log(this.carDetails);
  })
 }
 
}
