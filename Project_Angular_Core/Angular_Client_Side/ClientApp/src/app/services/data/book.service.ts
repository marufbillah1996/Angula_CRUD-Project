import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { apiUrl } from 'src/app/models/data/constants';
import { BookViewModel } from 'src/app/models/data/view-models/book-view-model';
import { ImagePathResponse } from 'src/app/models/data/view-models/image-path-response';
import { BookInputModel } from 'src/app/models/data/view-models/input/book-input-model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Book[]>{
    console.log('book get')
    return this.http.get<Book[]>(`${apiUrl}/Books`);
  } 
  getVM():Observable<BookViewModel[]>{
    return this.http.get<BookViewModel[]>(`${apiUrl}/Books/VM`);
  } 
  getById(id:number):Observable<Book>{
    return this.http.get<Book>(`${apiUrl}/Books/${id}`);
  } 
  insert(data:BookInputModel):Observable<Book>{
    return this.http.post<Book>(`${apiUrl}/Books/VM`, data);
  }
  update(data:BookInputModel):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Books/${data.bookID}/VM`, data);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${apiUrl}/Books/Upload/${id}`, formData);
  }
  delete(data:Book):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Books/${data.bookID}`);
  }
  
}
