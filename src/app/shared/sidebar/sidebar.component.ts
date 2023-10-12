import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONF } from './constants/sidebar.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  config = CONF;

  constructor(public router:Router) {
    console.log(typeof(screen.width), 'EL ANCHO')
  }

  ngOnInit(): void {
    this.detectScreen();
  }

  returnRoute():string{
    return this.router.url
  }

  clearLocal(){
    localStorage.clear();
  }

  detectScreen(){
    if(screen.width > 768){
      this.config = CONF;
    } else {
      this.config = 'text-center'
    }
  }

}
