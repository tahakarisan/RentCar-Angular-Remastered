import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url= "https://localhost:44398/api/";
  constructor(private httpClient:HttpClient) { }

  getProfileInfo(userId:number):Observable<SingleResponseModel<User>> {
      let path = this.url+"Users/getUserById?id="+userId;
      return this.httpClient.get<SingleResponseModel<User>>(path)
  }
}
