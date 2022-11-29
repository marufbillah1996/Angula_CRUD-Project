import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Author } from 'src/app/models/data/author';
import { GenderType } from 'src/app/models/data/constants';
import { AuthorViewModel } from 'src/app/models/data/view-models/author-view-model';
import { AuthorService } from 'src/app/services/data/author.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.css']
})
export class AuthorViewComponent implements OnInit {
  authors:Author[]=[];
  columns:string[] =['authorName', 'authorAddress', 'gender', 'actions'];
  dataSource:MatTableDataSource<Author> = new MatTableDataSource(this.authors);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private authorService:AuthorService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  getGender(v:number):string{
    return GenderType[v];
  }
  confirmDelete(data:AuthorViewModel){
    console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.authorService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Author removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.authorID != data.authorID);
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
    this.authorService.getVM()
    .subscribe({
      next: r=> {
        this.authors=r;

        this.dataSource.data = this.authors;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=> {
        this.notifyService.message('Failed to load authors', 'DISMISS');
        return throwError(()=> err);
      },
      
      
    })
  }
}
