import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Author } from 'src/app/models/data/author';
import { GenderType } from 'src/app/models/data/constants';
import { AuthorService } from 'src/app/services/data/author.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  author:Author = null!;
  authorForm:FormGroup = new FormGroup({
    authorName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    authorAddress:new FormControl('', Validators.required),
    gender:new FormControl('', [Validators.required])
  });
  //for select
  genderTypeOptions:{label:string,value:number}[]=[];

  constructor(
    private authorService:AuthorService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
  save(){
    if(this.authorForm.invalid) return;
      Object.assign(this.author, this.authorForm.value);
      //console.log(this.author);
      this.authorService.update(this.author)
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
    
    Object.keys(GenderType).filter(
      (type)=>isNaN(<any>type) && type !='values'
    ).forEach((v:any,i)=>{
      this.genderTypeOptions.push({label: v,value:<any> GenderType[v]});
    });
    let id:number=this.activatedRoute.snapshot.params['id'];
    this.authorService.getById(id)
    .subscribe({
      next: r=> {
        this.author=r;
        //console.log(this.author);
        this.authorForm.patchValue(this.author);
      },
      error: err=>{
        this.notifyService.message('Failed to load author data', 'DISMISS');
        throwError(()=>err);
      }
    })
  }

}