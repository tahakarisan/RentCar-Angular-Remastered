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

  login() {
    console.log("Login butonuna basıldı!");  // Butona basıldığını test et
    if (this.loginForm.valid) {
      console.log("Form geçerli:", this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info("Giriş başarılı");
        localStorage.setItem("token",response.data.token);
        this.router.navigate([""]);
        console.log(response);
      },responseError=>{
        this.toastrService.error("Giriş Başarısız");
      })
    } else {
      console.log("Form geçersiz!");
    }
  }
}
