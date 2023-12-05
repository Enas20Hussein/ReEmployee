import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient ) { }
  addemployee(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/employee",data)

  }
  getallemployee():Observable<any>{
    return this.http.get("http://localhost:3000/employee")

  }
  deletemployee(id:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/employee/${id}`)

  }
}
