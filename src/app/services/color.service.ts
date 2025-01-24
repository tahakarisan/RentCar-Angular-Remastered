import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  url="https://localhost:44398/api/Colors/";
  constructor(private httpClient :HttpClient) 
  {

  }

  getAllColor():Observable<ListResponseModel<Color>>{
    let path = this.url+"GetAllColor"
    return this.httpClient.get<ListResponseModel<Color>>(path)
  }
  getByColorId(colorId:number):Observable<ListResponseModel<Color>>{
    let path = this.url+"GetByColorId?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Color>>(path);
  }
}
