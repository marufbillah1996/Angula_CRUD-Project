import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Author } from 'src/app/models/data/author';
import { GenderType } from 'src/app/models/data/constants';
import { AuthorService } from 'src/app/services/data/author.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css']
})
export class AuthorCreateComponent implements OnInit {
  author:Author = {authorName:'', authorAddress:'', gender:undefined};
  authorForm:FormGroup = new FormGroup({
    authorName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    authorAddress:new FormControl('', Validators.required),
    gender:new FormControl('', [Validators.required])
  });
  //for select
  genderTypeOptions:{label:string,value:number}[]=[];

  constructor(
    private authorService:AuthorService,
    private notifyService:NotifyService
  ) { }
  save():void{
    if(this.authorForm.invalid) return;
    Object.assign(this.author, this.authorForm.value);
    //console.log(this.author);
    this.authorService.insert(this.author)
    .subscribe({
      next: r=>{
        this.notifyService.message('Data saved', 'DISMISS');
        this.author = {authorName:'', authorAddress:'', gender:undefined};
        this.authorForm.patchValue(this.author);
        this.authorForm.markAsUntouched();
        this.authorForm.markAsPristine();
        
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
    
    console.log(this.genderTypeOptions)
  }

}
