import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/data/author';
import { apiUrl } from 'src/app/models/data/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Author[]>{
    return this.http.get<Author[]>(`${apiUrl}/Authors`);
  } 
  getVM():Observable<Author[]>{
    return this.http.get<Author[]>(`${apiUrl}/Authors/VM`);
  }
  getById(id:number):Observable<Author>{
    return this.http.get<Author>(`${apiUrl}/Authors/${id}`);
  } 
  insert(data:Author):Observable<Author>{
    return this.http.post<Author>(`${apiUrl}/Authors`, data);
  } 
  update(data:Author):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Authors/${data.authorID}`, data);
  } 
  delete(data:Author):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Authors/${data.authorID}`);
  }
}
