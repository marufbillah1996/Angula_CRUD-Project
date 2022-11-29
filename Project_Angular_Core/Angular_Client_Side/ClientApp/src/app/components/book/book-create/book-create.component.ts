import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/models/data/genre';
import { BookInputModel } from 'src/app/models/data/view-models/input/book-input-model';
import { BookService } from 'src/app/services/data/book.service';
import { GenreService } from 'src/app/services/data/genre.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  book: BookInputModel = { bookName: undefined, price: undefined, publishDate:undefined,genreID:undefined,available: undefined };
  genres:Genre[] = [];
  bookForm: FormGroup = new FormGroup({
    bookName: new FormControl('', Validators.required),
    price: new FormControl(undefined, [Validators.required]),
    genreID: new FormControl(undefined, Validators.required),
    publishDate: new FormControl(undefined, Validators.required),
    available: new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
  });

  save() {
    if (this.bookForm.invalid) return;
    Object.assign(this.book, this.bookForm.value)
    //console.log(this.product);
    var _self = this;
    
    this.bookService.insert(this.book)
      .subscribe({
        next: r => {
          _self.notifyService.message('Data saved', 'DISMISS');
          var file = this.bookForm.controls['picture'].value.files[0];
          var reader = new FileReader();
          
          reader.onload = function (e: any) {
            console.log(e);
            _self.bookService.uploadImage(<number>r.bookID, file)
              .subscribe({
                next: r => {
                  _self.notifyService.message('Picture uploaded', 'DISMISS');
                },
                error: err => {
                  _self.notifyService.message('Picture upload failed', 'DISMISS');
                }
              });
          }
          reader.readAsArrayBuffer(file);
        },
        error: err => {
        _self.notifyService.message('Failed to save product', 'DISMISS')
        }
      });


  }

  constructor(
    private bookService: BookService,
    private genreService:GenreService,
    private notifyService: NotifyService
  ) { }

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

  }

}
