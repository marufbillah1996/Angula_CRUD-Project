import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/models/data/constants';
import { Genre } from 'src/app/models/data/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Genre[]>{
    return this.http.get<Genre[]>(`${apiUrl}/Genres`);
  } 
  getVM():Observable<Genre[]>{
    return this.http.get<Genre[]>(`${apiUrl}/Genres/VM`);
  } 
  getById(id:number):Observable<Genre>{
    return this.http.get<Genre>(`${apiUrl}/Genres/${id}`);
  } 
  insert(data:Genre):Observable<Genre>{
    return this.http.post<Genre>(`${apiUrl}/Genres`, data);
  } 
  update(data:Genre):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Genres/${data.genreID}`, data);
  } 
  delete(data:Genre):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Genres/${data.genreID}`);
  }
}
