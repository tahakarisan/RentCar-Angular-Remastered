import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
import { ToastrService } from 'ngx-toastr';
import { FavCarService } from '../../services/fav-car.service';
import { FavCar } from '../../models/favCar';
@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent implements OnInit {
   brands:Brand[]=[];
   colors:Color[]=[];
   colorId:number|null=null;
   brandId:number|null=null;
   carAddForm:FormGroup;    
   constructor
   (private formBuilder:FormBuilder,
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private favCarService:FavCarService
   ){}
   
   
    ngOnInit(): void {
     this.createCarAddForm();
     this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
     });
     this.colorService.getAllColor().subscribe(response=>{
      this.colors=response.data;
     })
    }


  onBrandChange() {
    console.log(this.brandId);
    this.brandId=this.carAddForm.value.brandId;
  }
  onColorChange(){
    console.log(this.colorId);
    this.colorId=this.carAddForm.value.colorId;
  }

   createCarAddForm(){
       this.carAddForm= this.formBuilder.group({
        modelYear:["",Validators.required],
        dailyPrice:["",Validators.required],
        description:["",Validators.required],
        colorId:["",Validators.required],
        brandId:["",Validators.required]
       })
   }
   
   addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.addCar(carModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Ekleme Başarılı")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Ekleme Başarısız")
          }
        }
        else{
          this.toastrService.error("Formunuz eksik","Dikkat")
        }
      })
    }
   }
}
