import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Observable, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;
  private cif = 'A456';
  private tk = 'tk';

  constructor(private http: HttpClient) { }
  login(usuario: string, clave: string):Observable<User>{
    const user = {email:usuario, password:clave}
    return this.http.post<User>(`${this.url}`, user);
  }

  simulSetToken(us:any):Observable<any>{
    return this.http.post<User>(`${this.url}`, us)
    .pipe(
      tap( user => {
        localStorage.setItem(this.tk, this.cifer(user));
      })
    )
  }

  cifer(o:any):any{
    return CryptoJS.AES.encrypt(JSON.stringify(o), this.cif).toString();
  }

  desCifer(o:any){
    return CryptoJS.AES.decrypt(o, this.cif).toString(CryptoJS.enc.Utf8);
  }

  checkAuthentication():Observable<boolean>{
    if(!localStorage.getItem('us')) return of(false);

    return of(true);
  }


}
