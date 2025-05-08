import { Component, OnInit } from '@angular/core';
import { FavCarService } from '../../services/fav-car.service';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  users:any;
  constructor(
    private favCarService: FavCarService,
    private carService: CarService,
    private toastrService: ToastrService,
    private  userService: UserService
  ) { }

  ngOnInit(): void {
    this.favCarService.decodeToken();
    this.favCarService.userId$.subscribe((id) => {
      this.userId = id;
      console.log("Component'e gelen User ID:", this.userId);
      if (this.userId) {
        this.userService.getProfileInfo(parseInt(this.userId)).subscribe(response => {
          console.log("Kullanıcı Bilgileri:", response.data);
          this.users = response.data;
        },responseError => {
          console.log("Kullanıcı bilgileri alınamadı:", responseError.error.message, responseError.error.Errors);
          this.toastrService.error("Hata", "Kullanıcı bilgileri alınamadı")
        })
      }
    });
  }

}
