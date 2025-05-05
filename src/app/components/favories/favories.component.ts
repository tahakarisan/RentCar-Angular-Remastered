import { Component, OnInit } from '@angular/core';
import { FavCarService } from '../../services/fav-car.service';
import { FavCar } from '../../models/favCar';
import { get } from 'http';
import { CarService } from '../../services/car.service';
import { CarImage } from '../../models/carImage';

@Component({
  selector: 'app-favories',
  templateUrl: './favories.component.html',
  styleUrl: './favories.component.css'
})
export class FavoriesComponent implements OnInit {
  userId: string | null = null;
  count:number;
  favCars:FavCar[]= [];
  carImages:CarImage[]=[];
  url = "https://localhost:44398/Images/";
  constructor(private favCarService: FavCarService,private carService:CarService) {}
 
  ngOnInit(): void {
    this.favCarService.userId$.subscribe(userId => {
      this.userId = userId; // value'yu burada alıyoruz
      console.log("User ID:", this.userId);
    });
    this.countOfFavCars();
    this.getFavCars(this.userId!); // userId'yi kullanarak favori arabaları al
    
  }

  getFavCars(userId: string): void {
    this.favCarService.getFavCarByUserId(userId).subscribe(response => {
      this.favCars = response.data; // Favori arabaları güncelle
      console.log("Favori Arabalar:", this.favCars);
    });
  }
  countOfFavCars(): number {
    return this.favCars.length; // Favori arabaların sayısını döndür
  }
  getCarImageByCarId(carId:number){
    this.carService.getCarImageByCarId(carId).subscribe(response=>{
      this.carImages=response.data
    })
  }
  
}
