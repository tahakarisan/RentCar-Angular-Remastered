import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  getRentalUrl="https://localhost:44398/api/Rentals/GetAllRental"
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.getRentalUrl)
  }
}
