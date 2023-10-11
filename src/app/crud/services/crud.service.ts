import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale } from '../interfaces/people.interface';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url = 'http://localhost:3000/ventas'

  constructor(private http: HttpClient) {}

  list(page:number):Observable<ISale[]>{
    return this.http.get<ISale[]>(`${this.url}`) ;
  }
}
