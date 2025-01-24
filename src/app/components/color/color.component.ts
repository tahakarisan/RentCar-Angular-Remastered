import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { CarService } from '../../services/car.service';
import { ShareService } from '../../services/share.service';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnInit {
  colors:Color[]=[];
  currentColor:Color|null=null;
  constructor(private colorService:ColorService,private carService:CarService,private shareService:ShareService){}
  ngOnInit(): void {
    this.getAllColor();
  }

  setColorFilter(colorId:number){
    let filterColor = this.shareService.setColorFilter(colorId);
    console.log(filterColor)
  }

  getAllColor(){
    this.colorService.getAllColor().subscribe(response=>{
      this.colors=response.data
    })
  }
  setCurrentColor(color:Color|null){
    this.currentColor=color
  }
  getCurrentColorClass(color:Color){
    if(this.currentColor==color){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllCurrentColorClass(){
    if(!this.currentColor){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
