import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"Cars/brand/:brandId",component:CarComponent},
  {path:"Cars/color/:colorId",component:CarComponent},
  {path:"Cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"Cars/Details/:carId",component:CarDetailComponent},
  {path:"Cars/AddCar",component:CarAddComponent},
  {path:"Cars/brand/:brandFilter/color/:colorFilter",component:CarFilterComponent},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
