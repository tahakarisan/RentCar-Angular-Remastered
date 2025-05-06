import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from '../../models/carImage';
import { Color } from '../../models/color';
import { FavCarService } from '../../services/fav-car.service';
import { get } from 'http';
import { FavCar } from '../../models/favCar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {
  userId: string | null = null;
  cars:Car[]=[];
  favCars:FavCar[]=[];
  colors:Color[]=[];
  carImages:CarImage[]=[];
  favCar:
  {
    userId:number,
    carId:number,
    isRental:number,
  };
  searchText:"";
  url = "https://localhost:44398/Images/";
  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private favCarService:FavCarService,
    private toastrService:ToastrService
  ){
  }
  ngOnInit(): void {
    this.getFavCarByUserId(this.userId!);
    this.favCarService.userId$.subscribe(userId => {
      this.userId = userId; // value'yu burada alıyoruz
      console.log("User ID:", this.userId);
    });
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
  getFavCarByUserId(userId:string){
    this.favCarService.getFavCarByUserId(userId).subscribe(response => {
      this.favCars = response.data; // Favori arabaları güncelle
      console.log("Favori Arabalar:", this.favCars);
    });
  }
  addFavCar(car:Car){
    let parseId = parseInt(this.userId!);
    this.favCar={
      userId:parseId,
      carId:car.id,
      isRental:0
    }
    if(this.userId==null){
      this.toastrService.error("Favorilere eklemek için giriş yapmalısınız","Favorilere Eklenemedi")
      return;
    }
    else{
      if(this.favCars.find(f=>f.carId==this.favCar.carId)){
        this.favCarService.addFavCar(this.favCar).subscribe((response)=>{
          this.toastrService.success(response.message,"Favorilere Eklendi")
        },responseError=>{
          this.toastrService.error(responseError.error.message,"Favorilere Eklenemedi")
        })
      }
      else{
        this.toastrService.error("Bu araba zaten favorilerinizde","Favorilere Eklenemedi")
      }
    }
    
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
