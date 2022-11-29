import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { baseUrl } from 'src/app/models/data/constants';
import { BookViewModel } from 'src/app/models/data/view-models/book-view-model';
import { BookService } from 'src/app/services/data/book.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  picPath:string = `${baseUrl}/Pictures`
  books:BookViewModel[] =[];
  dataSource:MatTableDataSource<BookViewModel> = new MatTableDataSource(this.books)
  columns:string[] =['picture','bookName', 'price', 'publishDate','genreName','available', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
 
  constructor(
    private bookService:BookService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:BookViewModel){
    console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.bookService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Book removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.bookID != data.bookID);
          },
          error:err=>{
            this.notifyService.message('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.bookService.getVM()
    .subscribe({
      next:r=>{
        this.books = r;
        this.dataSource.data = this.books;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:err=>{
        this.notifyService.message('Failed to load books', 'DISMISS');
        throwError(()=> err);
      }
    })
  }

}
