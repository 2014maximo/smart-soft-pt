import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }
  login(usuario: string, clave: string):Observable<User>{
    const user = {email:usuario, password:clave}
    return this.http.post<User>(`${this.url}`, user);
  }


}
