import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale, ITypeDocument } from '../interfaces/people.interface';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  list(page:number):Observable<ISale[]>{
    return this.http.get<ISale[]>(`${this.url}/sale`) ;
  }

  getTypeDocument():Observable<ITypeDocument[]>{
    return this.http.get<ITypeDocument[]>(`${this.url}/typeDocument`);
  }

  getMethodPayment():Observable<ITypeDocument[]>{
    return this.http.get<ITypeDocument[]>(`${this.url}/methodPayment`);
  }

  saveSale(sale: ISale):Observable<any>{
    return this.http.post<any>(`${this.url}/sale`, sale);
  }

  updateSale(sale: ISale):Observable<any>{
    return this.http.put<any>(`${this.url}/sale/` + sale.id, sale)
  }

  deleteSale(id: number):Observable<any>{
    return this.http.delete<any>(`${this.url}/sale/${id}`);
  }

  
}
