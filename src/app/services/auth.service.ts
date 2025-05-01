import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= "https://localhost:44398/api/Auths/";
  constructor(private httpClient:HttpClient) 
  {

  }

  login(user:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.url+"Login",user);

  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
