import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Genre } from 'src/app/models/data/genre';
import { GenreViewModel } from 'src/app/models/data/view-models/genre-view-model';
import { GenreService } from 'src/app/services/data/genre.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css']
})
export class GenreViewComponent implements OnInit {
  genres:Genre[]=[];
  columns:string[] =['genreName','actions'];
  dataSource:MatTableDataSource<Genre> = new MatTableDataSource(this.genres);
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private genreService:GenreService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:GenreViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.genreService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Author removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.genreID != data.genreID);
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
    this.genreService.getVM()
    .subscribe({
      next: r=> {
        this.genres=r;

        this.dataSource.data = this.genres;
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
