import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'rentcar';
  showMenus: boolean = true;
  constructor(private router:Router){}
  get isLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}