import { Component } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pt-smart-s-angular';
  simulation = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  };

  constructor(private auth:AuthService){
    this.receToken();
  }

  receToken(){
    this.auth.simulSetToken(this.simulation).subscribe({
      next:(resp) => {
        console.info("token ok");
      }
    })
  }

}
