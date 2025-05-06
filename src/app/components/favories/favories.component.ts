import { Component, OnInit } from '@angular/core';
import { FavCarService } from '../../services/fav-car.service';
import { FavCar } from '../../models/favCar';
import { get } from 'http';
import { CarService } from '../../services/car.service';
import { CarImage } from '../../models/carImage';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favories',
  templateUrl: './favories.component.html',
  styleUrl: './favories.component.css'
})
export class FavoriesComponent implements OnInit {
  userId: string | null = null;
  dataLoaded = false;
  count:number;
  favCars:FavCar[]= [];
  carImages:CarImage[]=[];
  url = "https://localhost:44398/Images/";
  constructor(private favCarService: FavCarService,private carService:CarService,private toastrService:ToastrService) {}
 
  ngOnInit(): void {
    this.favCarService.decodeToken();
    this.favCarService.userId$.subscribe((id) => {
      this.userId = id;
      console.log("Component'e gelen User ID:", this.userId);
      if (this.userId) {
        this.getFavCars(this.userId);
      }
    });
  }
  deleteFavCar(userId:string,favCarId:number){
    this.favCarService.deleteFavCar(userId,favCarId).subscribe(response => {
      this.toastrService.success("Başarılı","Favori araba silindi")
      console.log("Favori araba silindi:", response.message);
      this.getFavCars(this.userId!); // Favori arabaları güncelle
      window.location.reload(); // Sayfayı yenile
    },responseError => {
      console.log("Favori araba silinemedi:", responseError.error.message,responseError.error.Errors);
    });
  }
  getFavCars(userId: string): void {
    this.favCarService.getFavCarByUserId(userId).subscribe(response => {
      this.favCars = response.data;
      this.dataLoaded= true;
      console.log(this.dataLoaded); 
      console.log("Favori Arabalar:", this.favCars);
    });
  }
  getCarImageByCarId(carId:number){
    this.carService.getCarImageByCarId(carId).subscribe(response=>{
      this.carImages=response.data
    })
  }
  
}
