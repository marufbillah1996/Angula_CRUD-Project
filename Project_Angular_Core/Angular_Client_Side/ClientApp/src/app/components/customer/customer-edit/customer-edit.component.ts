import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Book } from 'src/app/models/data/book';
import { Customer } from 'src/app/models/data/customer';
import { SaleDetails } from 'src/app/models/data/sale-details';
import { BookService } from 'src/app/services/data/book.service';
import { CustomerService } from 'src/app/services/data/customer.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer:Customer = {customerName:undefined,customerPhone:undefined, saleDetails:[]}
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
    private notifyService:NotifyService,
    private activatedRout:ActivatedRoute
  ) { }
  get orderItemsFormArray(){
    return this.customerForm.controls["saleDetails"] as FormArray;
  }
  addItem(oi?:SaleDetails){
    if(oi){
      this.orderItemsFormArray.push(new FormGroup({
        bookID: new FormControl(oi.bookID, Validators.required),
        quantity:new FormControl(oi.quantity, Validators.required)
      }))
    }
    else
    {
      this.orderItemsFormArray.push(new FormGroup({
        bookID: new FormControl(undefined, Validators.required),
        quantity:new FormControl(undefined, Validators.required)
      }));
    }
    
  }
  removeItem(index:number){
    if(this.orderItemsFormArray.controls.length> 1)
      this.orderItemsFormArray.removeAt(index);
  }
  save(){
    if(this.customerForm.invalid) return;
    //console.log(this.orderForm.value);
    Object.assign(this.customer, this.customerForm.value);
    console.log(this.customer);
    this.customerService.update(this.customer)
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
  ngOnInit(): void {
    
    let id:number = this.activatedRout.snapshot.params['id'];
    this.customerService.getWithItems(id)
    .subscribe({
      next:r=>{
        this.customer = r;
        console.log(r);
        this.customerForm.patchValue(this.customer);
        this.customer.saleDetails?.forEach(oi=>{
          console.log(oi);
          this.addItem(oi);
        });
        console.log(this.customerForm.controls)
      },
      error:err=>{
        this.notifyService.message("Falied to load customer", "DISMISS");
        throwError(()=>err);
      }
    });
    this.bookService.get()
    .subscribe({
      next: r=>{
        this.books = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load products", 'DISMISS');
      }
    });
  }
}
