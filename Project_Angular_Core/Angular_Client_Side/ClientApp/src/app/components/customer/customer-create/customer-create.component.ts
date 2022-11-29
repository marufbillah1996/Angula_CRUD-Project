import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { Customer } from 'src/app/models/data/customer';
import { BookService } from 'src/app/services/data/book.service';
import { CustomerService } from 'src/app/services/data/customer.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customer:Customer = {customerName:undefined,customerPhone:undefined}
  books:Book[] =[];
  //
  customerForm:FormGroup= new FormGroup({
    customerName: new FormControl(undefined, Validators.required),
    customerPhone: new FormControl(undefined, Validators.required),
    saleDetails: new FormArray([])
  })
  constructor(
    private customerService: CustomerService,
    private bookService:BookService,
    private notifyService:NotifyService
  ) { }
  ngOnInit(): void {
    console.log('init')
    this.bookService.get()
    .subscribe({
      next: r=>{
        this.books = r;
        console.log(r);
      },
      error: err=>{
        this.notifyService.message("Failed to load books", 'DISMISS');
      }
    });
    this.addItem();
  }
save(){
  if(this.customerForm.invalid) return;
  //console.log(this.customerForm.value);
  Object.assign(this.customer, this.customerForm.value);
  console.log(this.customer);
  this.customerService.insert(this.customer)
  .subscribe({
    next:r=>{
      this.notifyService.message("Data saved", 'DISMISS');
    },
    error:err=>{
      this.notifyService.message("Failed to load Customers", 'DISMISS');
      throwError(()=>err);
    }
  })
}
get orderItemsFormArray(){
  return this.customerForm.controls["saleDetails"] as FormArray;
}
addItem(){
  this.orderItemsFormArray.push(new FormGroup({
    bookID: new FormControl(undefined, Validators.required),
    quantity:new FormControl(undefined, Validators.required)
  }))
}
removeItem(index:number){
  if(this.orderItemsFormArray.controls.length> 1)
    this.orderItemsFormArray.removeAt(index);
}


}
