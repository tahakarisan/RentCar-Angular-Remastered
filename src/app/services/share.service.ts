import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private brandFilterIdSource = new BehaviorSubject<number|null>(null);
  private colorFilterIdSource = new BehaviorSubject<number|null>(null);
  brandFilterId=this.brandFilterIdSource.asObservable();
  colorFilterId=this.colorFilterIdSource.asObservable();
  constructor(private httpClient:HttpClient) { }

  setBrandFilter(brandId:number|null):void{
    this.brandFilterIdSource.next(brandId);
  }
  setColorFilter(colorId:number|null):void{
    this.colorFilterIdSource.next(colorId);
  }
}
