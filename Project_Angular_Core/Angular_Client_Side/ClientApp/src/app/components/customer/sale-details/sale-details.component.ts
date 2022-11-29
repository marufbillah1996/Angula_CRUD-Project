import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { SaleDetails } from 'src/app/models/data/sale-details';
import { CustomerAndSaleDetailsViewModel } from 'src/app/models/data/view-models/customer-and-sale-details-view-model';
import { CustomerService } from 'src/app/services/data/customer.service';
import { NotifyService } from 'src/app/services/shared/notify.service';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {
  customer:CustomerAndSaleDetailsViewModel = {};
  
  dataSource= new MatTableDataSource(this.customer.saleDetails);
  columns:string[] = ['book', 'price', 'quantity', 'amount'];
  
    constructor(
      private customerService:CustomerService,
      private notifyService:NotifyService,
      private activatedRoute:ActivatedRoute
    ){}
   
  ngOnInit(): void {
    this.customer.saleDetails=[];
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.customerService.getWithItems(id)
    .subscribe({
      next: r=>{
        this.customer= r;
        console.log(this.customer)
        this.dataSource.data=this.customer.saleDetails as SaleDetails[];
      },
      error:err=>{
        this.notifyService.message('Failed to load customers', 'DISMISS');
        throwError(()=> err);
      }
    });
  }
}