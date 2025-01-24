import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Color } from '../../models/color';
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
   constructor(private formBuilder:FormBuilder,private carService:CarService,private brandService:BrandService,private colorService:ColorService){}
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
   //saasfsaasdfaf

   addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.addCar(carModel).subscribe(response=>{
        console.log(response.message);
        console.log("başarılı")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            console.log(responseError.error.ValidationErrors[i].ErrorMessage);
            
          }
         //safas //sada
        }

        //AASAFASF
        else{
///asasdas
        }
        
      })
    }
    else{
      console.log("hata")
    }
     
   }


}
