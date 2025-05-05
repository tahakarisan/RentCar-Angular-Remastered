import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { FavCar } from '../models/favCar';

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  email: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class FavCarService {


  public _userId: string | null = null;
  private url = "https://localhost:44398/api/";
  private _userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userId$: Observable<string | null> = this._userIdSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.decodeToken(); // Token'ı decode et ve userId'yi ayarla
  }

  private decodeToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        this._userIdSubject.next(userId); // UserId'yi observable üzerinden güncelle
      } catch (e) {
        console.error('Token decode hatası', e);
        this._userIdSubject.next(null); // Hata durumunda null değeri gönder
      }
    } else {
      this._userIdSubject.next(null); // Token bulunamazsa null gönder
    }
  }

  public getFavCarByUserId(userId: string):Observable<ListResponseModel<FavCar>>{
    return this.httpClient.get<ListResponseModel<FavCar>>(this.url + "Favs/getFavCars?userId=" + userId);
  }
}
