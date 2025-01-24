import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Color } from '../models/color';
import { CarDetail } from '../models/carDetail';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  url= "https://localhost:44398/api/";
  brandFilter:number;
  colorFilter:number;
  constructor(private httpClient:HttpClient) {}
  
  getCars():Observable<ListResponseModel<Car>>{
    let path = this.url+"Cars/GetAllCar"
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
  getCarByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let path = this.url+"Cars/GetByBrandId?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
  getImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let path = this.url+"CarImages/GetByCarId?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(path)
  }
  getAllImage():Observable<ListResponseModel<CarImage>>{
    let path = this.url+"CarImages/GetAllImage";
    return this.httpClient.get<ListResponseModel<CarImage>>(path)
  }
  getByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let path = this.url+"Cars/GetByColorId?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
  getCarImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let path = this.url+"CarImages/GetByCarId?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(path);
  }
  getCarDetailByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.url+"Cars/GetDetailByCarId?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }
  filterCar(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
    let path = this.url+"Cars/?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(path);
  }
  setBrandFilter(brand:Brand):number{
     this.brandFilter==brand.id
     return this.brandFilter;
  }
  setColorFilter(color:Color){
    this.brandFilter==color.id
  }
  addCar(car:Car):Observable<ResponseModel>{
   return this.httpClient.post<ResponseModel>(this.url+"Cars/AddCar",car)
  }
}
