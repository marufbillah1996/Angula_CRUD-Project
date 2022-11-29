import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { baseUrl } from 'src/app/models/data/constants';
import { Genre } from 'src/app/models/data/genre';
import { BookInputModel } from 'src/app/models/data/view-models/input/book-input-model';
import { BookService } from 'src/app/services/data/book.service';
import { GenreService } from 'src/app/services/data/genre.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book:Book= null!;
  imgPath:string= baseUrl;
  genres:Genre[] = [];
  bookForm: FormGroup = new FormGroup({
    bookName: new FormControl('', Validators.required),
    price: new FormControl(undefined, [Validators.required]),
    genreID: new FormControl(undefined, Validators.required),
    publishDate: new FormControl(undefined, Validators.required),
    available: new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
  });

  file: File = null!;
  constructor(
    private bookService: BookService,
    private genreService:GenreService,
    private notifyService: NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
  handleFileInputChange(event: any): void {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.bookForm.controls['picture'].patchValue(this.file.name);
    }
    else {
      this.bookForm.controls['picture'].patchValue("");
    }
    
  }
  save(){
    if(this.bookForm.invalid) return;
    let _self = this;
     Object.assign(this.book, this.bookForm.value);
     console.log(this.book);
     let data:BookInputModel = {bookID:this.book.bookID, bookName: this.book.bookName, price:this.book.price,publishDate:this.book.publishDate, available:this.book.available,genreID:this.book.genreID};
     this.bookService.update(data)
     .subscribe({
      next: r=>{
        this.notifyService.message("Book updated", "DISMISS");
        if(this.file){
         _self. updateImage();
        }
      }
     })
  }
  updateImage(){
    let _self = this;
    var reader = new FileReader();
        
        reader.onload = function (e: any) {
         _self.bookService.uploadImage(<number>_self.book.bookID, _self.file)
         .subscribe({
          next:r=>{
            _self.notifyService.message("Picture updated", "DISMISS");
          },
          error: err=>{
            _self.notifyService.message("Picture update failed", "DISMISS");
            throwError(()=>err);
          }
         })
        }
        reader.readAsArrayBuffer(_self.file);
  }
ngOnInit(): void {
  this.genreService.get()
    .subscribe({
      next: r=>{
        this.genres = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load customers", 'DISMISS');
      }
    });
  let id:number = this.activatedRoute.snapshot.params['id'];
  this.bookService.getById(id)
  .subscribe({
    next: r=>{
      this.book=r;
      this.bookForm.patchValue(this.book)
      console.log(this.book)
    },
    error: err=> {
      this.notifyService.message('Failed to load product data', 'DISMISS')
      throwError(()=>err);
    } 
  });
}
}
