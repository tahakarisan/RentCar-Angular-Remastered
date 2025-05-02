import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent  implements OnInit {

  constructor(private toastrService:ToastrService) { }

  ngOnInit(): void {

  }

  quit(){
    if(confirm("Çıkış yapmak istediğinize emin misiniz?"))
    {
      localStorage.removeItem("token")
      this.toastrService.info("Çıkış yapıldı")
    }
    else{
      this.toastrService.info("Çıkış iptal edildi")
    }
  }

  checkToken(){
    let token = localStorage.getItem("token") 
    if(token){
      return true
    }
    else{
      return false
    }
  }


}
