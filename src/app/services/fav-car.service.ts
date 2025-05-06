import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { FavCar } from '../models/favCar';
import { ResponseModel } from '../models/responseModel';
import { Car } from '../models/car';
import { PostFavCar } from '../models/postFavCar';

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  email: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class FavCarService {

  private url = "https://localhost:44398/api/";
  private _userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userId$: Observable<string | null> = this._userIdSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.decodeToken();
  }

  public async decodeToken(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = await jwtDecode<DecodedToken>(token);
        const userId =  decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        this._userIdSubject.next(userId); // UserId'yi observable üzerinden güncelle
        console.log("User ID:id", userId); // Konsola yazdır
      } catch (e) {
        console.error('Token decode hatası', e);
        this._userIdSubject.next(null); // Hata durumunda null değeri gönder
      }
    } else {
      this._userIdSubject.next(null); // Token bulunamazsa null gönder
    }
  }
  public deleteFavCar(userId: string,favCarId:number):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.url + "Favs/deleteFavCar?favCarId="+favCarId+"&userId="+ userId);
  }
  public getFavCarByUserId(userId: string):Observable<ListResponseModel<FavCar>>{
    return this.httpClient.get<ListResponseModel<FavCar>>(this.url + "Favs/getFavCars?userId=" + userId);
  }

  public addFavCar(favCar: PostFavCar): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.url + "Favs/addFavCar", favCar);
  }
}
