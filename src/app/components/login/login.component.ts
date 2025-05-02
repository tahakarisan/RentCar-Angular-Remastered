import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { response} from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder
    ,private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
  ) 
  {

  }

  ngOnInit(): void {
    console.log("ngOnInit çalıştı!");  // Bileşenin yüklendiğini anlamak için
    this.createLoginForm();
  }
  

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  checkToken(){
    let token = localStorage.getItem("token");
    if(token){
      return true;
    }
    return false;
  }

  check(){
    console.log("Check butonuna basıldı!");  // Butona basıldığını test et
    console.log(this.loginForm.value);  // Form değerlerini konsola yazdır
    if (this.loginForm.valid) {
      console.log("Form geçerli:", this.loginForm.value);
    } else {
      console.log("Form geçersiz!");
      this.toastrService.info("Geçersiz")
    }
  }

  login() {
    console.log("Login butonuna basıldı!");  // Butona basıldığını test et
    if (this.loginForm.valid) {
      console.log("Form geçerli:", this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Giriş başarılı");
        localStorage.setItem("token",response.data.token);
        this.router.navigate([""]);
        console.log(response);
      },responseError=>{
        this.toastrService.error("Giriş Başarısız,Bilgileri kontrol ediniz!");
      })
    } else {
      console.log("Form geçersiz!");
      this.toastrService.error("Geçersiz Bilgiler!","E-posta ve Şifre alanlarını kontrol ediniz.");
    }
  }
}
