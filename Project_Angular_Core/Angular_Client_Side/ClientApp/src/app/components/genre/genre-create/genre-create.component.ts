import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Genre } from 'src/app/models/data/genre';
import { GenreService } from 'src/app/services/data/genre.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {
  genre:Genre = {genreName:''};
  genreForm:FormGroup = new FormGroup({
    genreName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
  });
  constructor(
    private genreService:GenreService,
    private notifyService:NotifyService
  ) { }
  save():void{
    if(this.genreForm.invalid) return;
    Object.assign(this.genre, this.genreForm.value);
    //console.log(this.genre);
    this.genreService.insert(this.genre)
    .subscribe({
      next: r=>{
        this.notifyService.message('Data saved', 'DISMISS');
        this.genre = {genreName:''};
        this.genreForm.patchValue(this.genre);
        this.genreForm.markAsUntouched();
        this.genreForm.markAsPristine();
        
      },
      error:err=> {
        this.notifyService.message('Failed to save data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }
  ngOnInit(): void {
    
  }

}
