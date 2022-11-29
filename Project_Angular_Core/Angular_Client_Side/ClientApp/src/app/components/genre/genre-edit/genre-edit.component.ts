import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Genre } from 'src/app/models/data/genre';
import { GenreService } from 'src/app/services/data/genre.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {
  genre:Genre = null!;
  genreForm:FormGroup = new FormGroup({
    genreName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
  });
  constructor(
    private genreService:GenreService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
  save(){
    if(this.genreForm.invalid) return;
      Object.assign(this.genre, this.genreForm.value);
      //console.log(this.author);
      this.genreService.update(this.genre)
      .subscribe({
        next:r=>{
          this.notifyService.message('Data saved', 'DISMISS');
        },
        error:err=> {
          this.notifyService.message('Failed to save data', 'DISMISS');
          throwError(()=>err);
        }
      })
  }

  ngOnInit(): void {
  
    let id:number=this.activatedRoute.snapshot.params['id'];
    this.genreService.getById(id)
    .subscribe({
      next: r=> {
        this.genre=r;
        //console.log(this.author);
        this.genreForm.patchValue(this.genre);
      },
      error: err=>{
        this.notifyService.message('Failed to load author data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }

}