import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { CustomerViewModel } from 'src/app/models/data/view-models/customer-view-model';
import { CustomerService } from 'src/app/services/data/customer.service';
import { NotifyService } from 'src/app/services/shared/notify.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {
  customers:CustomerViewModel[] = [];
  dataSource:MatTableDataSource<CustomerViewModel> = new MatTableDataSource(this.customers);
  columns:string[] = [ 'customerName','customerPhone', 'orderValue','details', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private customerService:CustomerService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:CustomerViewModel){
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
        if(result){
          this.customerService.delete(<number>data.customerID)
          .subscribe({
            next:r=>{
              this.notifyService.message("Data deleted", "DISMISS");
              this.dataSource.data = this.dataSource.data.filter(x=> x.customerID != data.customerID);
            },
            error: err=>{
              this.notifyService.message("Data delete failed", "DISMISS");
              throwError(()=>err);
            }
          });
        }
    });
   }
  ngOnInit(): void {
    this.customerService.getVM()
    .subscribe({
      next: r=> {
        this.customers = r;
        this.dataSource.data = this.customers;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:err=>{
        this.notifyService.message('Failed to load customers', 'DISMISS');
        throwError(()=> err);
      }
    })
  }

}
