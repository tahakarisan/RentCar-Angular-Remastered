import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { RoleComponent } from './components/role/role.component';
import { HTTP_INTERCEPTORS, HttpClientModule, withInterceptors } from '@angular/common/http';
import { NaviComponent } from './components/navi/navi.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ColorComponent } from './components/color/color.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { TransformBrandPipe } from './pipes/transform-brand.pipe';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { FavoriesComponent } from './components/favories/favories.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    RentalComponent,
    UserComponent,
    CampaignComponent,
    RoleComponent,
    NaviComponent,
    CarDetailComponent,
    VatAddedPipe,
    FilterPipe,
    CarFilterComponent,
    TransformBrandPipe,
    CarAddComponent,
    LoginComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    FavoriesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//taha