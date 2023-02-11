import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-app';

  constructor(private router:Router){}

  goToPage(name:String):void{
    this.router.navigate([`${name}`])
  }
}
