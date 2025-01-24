import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  getAllurl= "https://localhost:44398/api/Brands/GetAllBrand"
  brandFilterId:number;
  constructor(private httpClient:HttpClient){}
   
  getBrands():Observable<ListResponseModel<Brand>>{
      return this.httpClient.get<ListResponseModel<Brand>>(this.getAllurl)
  }
}
